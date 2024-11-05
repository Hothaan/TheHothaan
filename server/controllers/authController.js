const nodemailer = require('nodemailer');
const userModel = require('../models/userModel');
const util = require('../utils');

// 인증 코드를 저장할 Map 객체와 만료 시간을 관리할 객체 생성
const emailVerificationCodes = new Map(); // {email: code}
const verificationExpiryTimes = new Map(); // {email: expiryTime}

const CODE_EXPIRY_TIME = 5 * 60 * 1000; // 5분 (밀리초 단위)

// 회원가입
const register = async (req, res) => {
  const { email, name, password } = req.body;

  // 이메일 형식 검증
  if (!util.isValidEmail(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  if (!email || !name || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    await userModel.registerUser({ email, name, password });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};

// 아이디(이메일) 중복 확인 함수
const checkUseremail = async (req, res) => {
  const { useremail } = req.query;

  // 이메일 형식 검증
  if (!util.isValidEmail(useremail)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  if (!useremail) {
    return res.status(400).json({ message: "User email is required" });
  }

  try {
    const exists = await userModel.checkUseremailExists(useremail);

    if (exists) {
      return res.json({ available: false, message: "사용할 수 없는 이메일 입니다. 다른 이메일을 입력해 주세요." });
    } else {
      return res.json({ available: true, message: "사용 가능한 이메일 입니다." });
    }
  } catch (error) {
    console.error("Error checking User email:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// 이메일 인증 코드 전송
const sendVerificationCode = async (req, res) => {
  const { email } = req.body;

  // 이메일 형식 검증
  if (!util.isValidEmail(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  // 랜덤 인증 코드 생성
  const verificationCode = util.generateRandomCode();

  // 만료 시간 설정
  const expiryTime = Date.now() + CODE_EXPIRY_TIME;

  // 인증 코드와 만료 시간 저장
  emailVerificationCodes.set(email, verificationCode);
  verificationExpiryTimes.set(email, expiryTime);

  // 이메일 전송 설정
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Gmail을 사용 중인 경우
    auth: {
      user: process.env.EMAIL_USER, // 발신자 이메일
      pass: process.env.EMAIL_PASS, // 발신자 이메일 비밀번호 또는 앱 비밀번호
    },
  });

  const mailOptions = {
    from: '[The핫한] 고객지원 <' + process.env.EMAIL_USER + '>', // 이름과 이메일 주소를 함께 설정
    to: email,
    subject: '[The핫한]회원가입 인증 코드',
    html: `
      <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
        <h2 style="color: #4CAF50;">회원가입 인증 코드</h2>
        <p style="font-size: 18px;">안녕하세요.</p>
        <p style="font-size: 16px;">아래 인증 코드를 입력하여 회원가입을 완료해 주세요.</p>
        <p style="font-size: 24px; font-weight: bold; color: #333;margin: 5px;">${verificationCode}</p>
        <p style="font-size: 14px; color: #888;">이 인증 코드는 <strong>5분</strong> 동안만 유효합니다.</p>
        <p style="font-size: 14px; color: #888;">감사합니다.<br>The핫한 고객지원</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Verification code sent to email' });
  } catch (error) {
    console.error('Error sending verification code:', error);
    res.status(500).json({ message: 'Error sending verification code' });
  }
};

// 이메일 인증 코드 확인
const verifyCode = async (req, res) => {
  const { email, code } = req.body;

  if (!email || !code) {
    return res.status(400).json({ message: 'Email and code are required' });
  }

  // 저장된 인증 코드 확인
  const savedCode = emailVerificationCodes.get(email);
  const expiryTime = verificationExpiryTimes.get(email);

  // 인증 코드와 만료 시간 확인
  if (!savedCode || savedCode !== code) {
    return res.status(400).json({ message: '잘못된 인증 코드 입니다. 다시 한번 확인해주세요.' });
  } else if (Date.now() > expiryTime) {
    // 인증 코드 만료
    emailVerificationCodes.delete(email);
    verificationExpiryTimes.delete(email);
    return res.status(400).json({ message: '인증 코드가 만료되었습니다.' });
  }

  // 인증 성공 시 Map에서 데이터 삭제
  emailVerificationCodes.delete(email);
  verificationExpiryTimes.delete(email);
  // 인증 성공 시 `email_verified` 업데이트
  await userModel.updateEmailVerified(email);
  res.status(200).json({ message: '이메일 인증이 완료되었습니다.' });
};

module.exports = { register, checkUseremail, sendVerificationCode, verifyCode };
