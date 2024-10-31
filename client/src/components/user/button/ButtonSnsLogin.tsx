export interface IbuttonSnsLogin {
  sns: "kakao" | "google" | "naver" | "facebook";
  onClick: () => void;
}

export default function ButtonSnsLogin(prop: IbuttonSnsLogin) {
  const { sns, onClick } = prop;
  return (
    <button type="button" onClick={onClick}>
      <img src={`/assets/images/${sns}.png`} alt={`${sns} login`} />
    </button>
  );
}
