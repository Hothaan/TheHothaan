/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { useState, useEffect } from "react";
import { OuterWrap, ContentsWrap } from "../commonComponent/Wrap";
import Title from "../commonComponent/Title";
import { ReactComponent as Arrow } from "@svgs/template/processArrow.svg";
import { ReactComponent as CheckBox } from "@svgs/template/productCheckbox.svg";
import { ReactComponent as Delete } from "@svgs/template/productDelete.svg";
import { ReactComponent as Minus } from "@svgs/template/productAmountMinus.svg";
import { ReactComponent as Plus } from "@svgs/template/productAmountPlus.svg";
import { ReactComponent as Caption } from "@svgs/template/productCaption.svg";
import Tabs from "../commonComponent/Tabs";
import ImageBox from "../commonComponent/ImageBox";

const title_ = "제품 이름";
const title_className = "cart_title";

export interface IcartContent {
  cartTitle?: string;
}

export interface IcartStyle {
  cartTitle?: CSSObject;
}

interface Icart {
  content?: IcartContent | null;
  style?: IcartStyle | null;
  isEditable?: boolean;
  onChangeContent?: (key: string, value: string) => void;
  onChangeStyle?: (key: string, value: CSSObject) => void;
}

export const cart_title_css = {
  color: "#486284",
  leadingTrim: "both",
  textEdge: "cap",
  fontFamily: "Inter",
  fontSize: "13px",
  fontStyle: "normal",
  fontWeight: "500",
  lineHeight: "160%",
};

function CartTitle() {
  const container = css`
    width: 100%;
    margin-bottom: 46px;
  `;

  const process_container = css`
    width: 100%;
    justify-content: center;
    display: inline-flex;
    align-items: center;
    gap: 40px;
  `;

  const process_item = css`
    color: #486284;
    leading-trim: both;
    text-edge: cap;

    /* 13 */
    font-family: Inter;
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    line-height: 160%;
  `;

  return (
    <div css={container}>
      <Title
        title="장바구니"
        transform="uppercase"
        weight="light"
        marginBottom={50}
      />
      <div css={process_container}>
        <p css={process_item}>1. 장바구니</p>
        <Arrow />
        <p css={process_item}>2. 주문서작성</p>
        <Arrow />
        <p css={process_item}>3. 주문완료</p>
      </div>
    </div>
  );
}

function CartOrder(prop: Icart) {
  const { content, style, isEditable, onChangeContent, onChangeStyle } = prop;

  const container = css`
    display: flex;
    gap: 50px;
    width: 100%;

    margin-bottom: 50px;
  `;
  const cart_product_list_container = css`
    width: calc(100% - 300px - 50px);
  `;
  const order_product_list_container = css`
    margin-top: 104px;
    width: 300px;
  `;

  const order_list_box = css`
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 100%;
    padding: 16px 21px;
    border: 1px solid #486284;

    margin-bottom: 20px;
  `;

  const cart_product_list_box = css`
    display: flex;
    flex-direction: column;
    gap: 30px;

    width: 100%;
    padding: 16px 0 28px;
    margin-bottom: 32px;

    border-top: 1px solid #486284;
    border-bottom: 1px solid #ddd;
  `;

  const text_style = css`
    color: #486284;
    leading-trim: both;
    text-edge: cap;

    /* 13 */
    font-family: Inter;
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    line-height: 160%; /* 20.8px */
  `;

  const text_light = css`
    color: #486284;
    leading-trim: both;
    text-edge: cap;

    /* 13 */
    font-family: Inter;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 160%; /* 20.8px */
  `;

  const divider = css`
    display: block;
    width: 100%;
    height: 1px;
    background: #e5e5e5;
  `;

  const text_container = css`
    display: flex;
    width: 100%;
    justify-content: space-between;
  `;

  const product_item = css`
    display: flex;
    align-items: start;
    justify-content: space-between;
  `;

  const checkbox = css`
    margin-right: 13px;
  `;

  const product_info_container = css`
    padding-top: 9px;
    margin-left: 20px;
  `;

  const product_delete_container = css`
    display: flex;
    align-items: center;
    gap: 18px;
  `;

  const product_item_inner_container = css`
    display: flex;
  `;

  const product_controler = css`
    width: 100%;
    display: flex;
    justify-content: end;
    gap: 50px;
  `;

  const amount_controler_container = css`
    display: flex;
    gap: 10px;
  `;

  const amount_coltroler = css`
    display: flex;
  `;

  const amount_button = css`
    display: flex;
    width: 30px;
    height: 30px;
    justify-content: center;
    align-items: center;

    border: 1px solid var(--E5E5E5, #e5e5e5);
  `;

  const amount_button_big = css`
    display: flex;
    width: 45px;
    height: 30px;
    justify-content: center;
    align-items: center;

    color: #486284;

    border-top: 1px solid var(--E5E5E5, #e5e5e5);
    border-bottom: 1px solid var(--E5E5E5, #e5e5e5);

    /* 15 */
    font-family: Inter;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
  `;

  const text_bold = css`
    color: #486284;
    text-align: right;
    font-family: "Noto Sans KR";
    font-size: 15px;
    font-style: normal;
    font-weight: 700;
    line-height: 35px; /* 233.333% */
  `;

  const submit_amount_button = css`
    display: flex;
    width: 66px;
    height: 30px;
    justify-content: center;
    align-items: center;

    border: 1px solid #bcbcbc;

    color: #486284;

    /* 15 */
    font-family: Inter;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 160%; /* 24px */
  `;

  const button_container = css`
    display: flex;
    gap: 6px;
  `;

  const button_container_end = css`
    width: 100%;
    display: flex;
    justify-content: end;
    gap: 6px;
  `;

  const button_light = css`
    display: flex;
    width: 96px;
    height: 30px;
    justify-content: center;
    align-items: center;

    border: 1px solid #bcbcbc;

    color: #486284;

    /* 15 */
    font-family: Inter;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 160%; /* 24px */
  `;

  const button_dark = css`
    display: flex;
    width: 96px;
    height: 30px;
    justify-content: center;
    align-items: center;

    background: #486284;

    color: #fff;

    /* 15 */
    font-family: Inter;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 160%; /* 24px */
  `;

  const button_big_dark = css`
    display: flex;
    width: 300px;
    height: 50px;
    padding: 4px 105px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;

    background: #486284;

    color: #fff;
    text-align: center;
    font-family: "Noto Sans KR";
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: 35px; /* 233.333% */
  `;

  const button_big_light = css`
    display: flex;
    width: 300px;
    height: 50px;
    padding: 4px 105px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;

    border: 1px solid #bcbcbc;

    color: #486284;
    text-align: center;
    font-family: "Noto Sans KR";
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: 35px; /* 233.333% */
  `;

  const order_button_container = css`
    display: flex;
    flex-direction: column;
    gap: 10px;
  `;

  const caption_container = css`
    display: flex;
    gap: 6px;
  `;

  const cart_product_list_inner_container = css``;

  return (
    <div css={container}>
      <div css={cart_product_list_container}>
        <Tabs
          tab1={{ text: "국내배송상품 (1)", width: "275px" }}
          tab2={{ text: "해외배송상품 (1)", width: "275px" }}
        />
        <div css={cart_product_list_inner_container}>
          <div css={cart_product_list_box}>
            <p css={text_style}>장바구니 상품</p>
            <div css={product_item}>
              <div css={product_item_inner_container}>
                <CheckBox css={checkbox} />
                <ImageBox
                  container={{ width: "77px", height: "82px" }}
                  icon={{ width: "28px", height: "28px" }}
                  borderRadius="0"
                />
                <div css={product_info_container}>
                  <p
                    css={style?.cartTitle || cart_title_css}
                    className={title_className}
                  >
                    {content?.cartTitle || title_}
                  </p>
                  <p css={text_style}>￦5,600,000</p>
                </div>
              </div>
              <div css={product_delete_container}>
                <p css={text_bold}>￦5,600,000</p>
                <Delete />
              </div>
            </div>
            <div css={product_controler}>
              <div css={amount_controler_container}>
                <div css={amount_coltroler}>
                  <div css={amount_button}>
                    <Minus />
                  </div>
                  <div css={amount_button_big}>1</div>
                  <div css={amount_button}>
                    <Plus />
                  </div>
                </div>
                <div css={submit_amount_button}>변경</div>
              </div>
              <div css={button_container}>
                <div css={button_light}>관심상품</div>
                <div css={button_dark}>주문하기</div>
              </div>
            </div>
          </div>
          <div css={button_container_end}>
            <div css={button_light}>전체선택</div>
            <div css={button_light}>전체삭제</div>
          </div>
        </div>
      </div>
      <div css={order_product_list_container}>
        <div css={order_list_box}>
          <p css={text_light}>주문상품</p>
          <span css={divider}></span>
          <div css={text_container}>
            <p css={text_light}>총 상품금액</p>
            <p css={text_light}>￦5,600,000</p>
          </div>
          <div css={text_container}>
            <p css={text_light}>총 배송비</p>
            <p css={text_light}>￦3,000</p>
          </div>
          <span css={divider}></span>
          <div css={text_container}>
            <p css={text_light}>결제예정금액</p>
            <p css={text_light}>￦5,603,000</p>
          </div>
        </div>
        <div css={order_button_container}>
          <div css={button_big_dark}>전체상품주문</div>
          <div css={button_big_light}>선택상품주문</div>
          <div css={caption_container}>
            <Caption />
            <p css={text_style}>
              할인 적용 금액은 주문서작성의 결제예정금액에서 확인 가능합니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CartInfo() {
  const container = css`
    width: 100%;
  `;

  const title = css`
    width: 100%;
    color: #486284;

    /* 17 */
    font-family: Inter;
    font-size: 17px;
    font-style: normal;
    font-weight: 500;
    line-height: 160%; /* 27.2px */
    margin-bottom: 8px;
  `;

  const info_box = css`
    width: 100%;
    height: 392px;

    padding: 38px 26px;
    border-top: 1px solid var(--E5E5E5, #486284);
    border-left: 1px solid var(--E5E5E5, #e5e5e5);
    border-right: 1px solid var(--E5E5E5, #e5e5e5);
    border-bottom: 1px solid var(--E5E5E5, #e5e5e5);
  `;

  const info_title = css`
    color: #486284;
    leading-trim: both;
    text-edge: cap;

    /* 13 */
    font-family: Inter;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;

    margin-bottom: 15px;
  `;

  const info_desc = css`
    width: 100%;

    display: flex;
    align-items: center;
    gap: 6px;
  `;

  const info_desc_text = css`
    color: #486284;
    leading-trim: both;
    text-edge: cap;

    /* 13 */
    font-family: Inter;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
  `;

  const info_desc_circle = css`
    display: block;
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background-color: #486284;
  `;

  const info_contents_container = css`
    margin-bottom: 50px;
  `;

  return (
    <div css={container}>
      <p css={title}>이용안내</p>
      <div css={info_box}>
        <div css={info_contents_container}>
          <p css={info_title}>장바구니 이용안내</p>
          <p css={info_desc}>
            <span css={info_desc_circle}></span>
            <span css={info_desc_text}>
              해외배송 상품과 국내배송 상품은 함께 결제하실 수 없으니 장바구니
              별로 따로 결제해 주시기 바랍니다.
            </span>
          </p>
          <p css={info_desc}>
            <span css={info_desc_circle}></span>
            <span css={info_desc_text}>
              해외배송 가능 상품의 경우 국내배송 장바구니에 담았다가 해외배송
              장바구니로 이동하여 결제하실 수 있습니다.
            </span>
          </p>
          <p css={info_desc}>
            <span css={info_desc_circle}></span>
            <span css={info_desc_text}>
              선택하신 상품의 수량을 변경하시려면 수량변경 후 [변경] 버튼을
              누르시면 됩니다.
            </span>
          </p>
          <p css={info_desc}>
            <span css={info_desc_circle}></span>
            <span css={info_desc_text}>
              [쇼핑계속하기] 버튼을 누르시면 쇼핑을 계속 하실 수 있습니다.
            </span>
          </p>
          <p css={info_desc}>
            <span css={info_desc_circle}></span>
            <span css={info_desc_text}>
              장바구니와 관심상품을 이용하여 원하시는 상품만 주문하거나
              관심상품으로 등록하실 수 있습니다.
            </span>
          </p>
          <p css={info_desc}>
            <span css={info_desc_circle}></span>
            <span css={info_desc_text}>
              파일첨부 옵션은 동일상품을 장바구니에 추가할 경우 마지막에 업로드
              한 파일로 교체됩니다.
            </span>
          </p>
        </div>
        <div>
          <p css={info_title}>무이자할부 이용안내</p>
          <p css={info_desc}>
            <span css={info_desc_circle}></span>
            <span css={info_desc_text}>
              상품별 무이자할부 혜택을 받으시려면 무이자할부 상품만 선택하여
              [주문하기] 버튼을 눌러 주문/결제 하시면 됩니다.
            </span>
          </p>
          <p css={info_desc}>
            <span css={info_desc_circle}></span>
            <span css={info_desc_text}>
              [전체 상품 주문] 버튼을 누르시면 장바구니의 구분없이 선택된 모든
              상품에 대한 주문/결제가 이루어집니다.
            </span>
          </p>
          <p css={info_desc}>
            <span css={info_desc_circle}></span>
            <span css={info_desc_text}>
              단, 전체 상품을 주문/결제하실 경우, 상품별 무이자할부 혜택을
              받으실 수 없습니다.
            </span>
          </p>
          <p css={info_desc}>
            <span css={info_desc_circle}></span>
            <span css={info_desc_text}>
              무이자할부 상품은 장바구니에서 별도 무이자할부 상품 영역에
              표시되어, 무이자할부 상품 기준으로 배송비가 표시됩니다.
            </span>
          </p>
          <p css={info_desc}>
            <span css={info_desc_circle}></span>
            <span css={info_desc_text}>
              실제 배송비는 함께 주문하는 상품에 따라 적용되오니 주문서 하단의
              배송비 정보를 참고해주시기 바랍니다.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Cart(prop: Icart) {
  const { content, style, isEditable, onChangeContent, onChangeStyle } = prop;

  const initial = {
    cartTitle: {
      text: content?.cartTitle || title_,
      css: content?.cartTitle || cart_title_css,
    },
  };

  const [edit, setEdit] = useState(initial);

  useEffect(() => {
    if (content) {
      setEdit(initial);
    }
  }, [content]);

  const container = css`
    width: 100%;
  `;

  return (
    <OuterWrap padding="200px 0">
      <ContentsWrap>
        <div css={container}>
          <CartTitle />
          <CartOrder
            content={content}
            style={style}
            isEditable={isEditable}
            // onChange={onChange}
          />
          <CartInfo />
        </div>
      </ContentsWrap>
    </OuterWrap>
  );
}
