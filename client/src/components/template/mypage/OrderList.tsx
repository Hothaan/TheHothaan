/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { OuterWrap, ContentsWrap } from "../commonComponent/Wrap";
import Pagination from "../commonComponent/Pagination";
import { ReactComponent as Arrow } from "@svgs/template/selectBoxArrow.svg";
import { ReactComponent as Calendar } from "@svgs/template/calendar.svg";
import Tabs from "../commonComponent/Tabs";

function OrderListTitle() {
  const container = css`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 24px;

    margin-bottom: 65px;
  `;

  const title = css`
    color: #486284;
    font-family: "Noto Sans KR";
    font-size: 22px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    text-transform: capitalize;
  `;

  const nav_container = css`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 24px;
  `;

  const nav_item = css`
    color: #486284;
    font-family: "Noto Sans KR";
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 35px; /* 233.333% */
  `;

  const selected = css`
    font-weight: 700;
  `;

  return (
    <div css={container}>
      <p css={title}>My Account</p>
      <ul css={nav_container}>
        <li css={[nav_item, selected]}>주문내역 조회</li>
        <li css={nav_item}>장바구니</li>
        <li css={nav_item}>위시리스트</li>
        <li css={nav_item}>회원 정보 수정</li>
        <li css={nav_item}>로그아웃</li>
      </ul>
    </div>
  );
}

function OrderListFilterSearch() {
  const container = css`
    width: 100%;
  `;

  const title = css`
    width: 100%;
    color: #486284;
    font-family: "Noto Sans KR";
    font-size: 22px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;

    margin-bottom: 28px;
  `;

  const text_light = css`
    color: #486284;
    text-align: center;
    font-family: "Noto Sans KR";
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
  `;

  const filter_box = css`
    display: flex;

    gap: 16px;
    width: 100%;
    padding: 32px 24px;
    border: 1px solid var(--E5E5E5, #e5e5e5);
    background: #f6f6f6;

    margin-bottom: 16px;
  `;

  const filter_select_box = css`
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 7px;

    width: 135px;
    height: 40px;
    border: 1px solid #e0e0e0;
    background: #fff;
  `;

  const filter_button_container = css`
    display: flex;
  `;

  const filter_button = css`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 60px;
    height: 40px;
    border-left: 1px solid #bcbcbc;
    border-top: 1px solid #bcbcbc;
    border-bottom: 1px solid #bcbcbc;
    background: #fff;
  `;

  const filter_button_selected = css`
    border: 1px solid #486284;
  `;

  const filter_button_last = css`
    border-right: 1px solid #bcbcbc;
  `;

  const date_range_container = css`
    display: flex;
    align-items: center;
    gap: 12px;
  `;

  const date_range_box = css`
    display: flex;
    align-items: center;

    padding: 11px;
    width: 130px;
    height: 40px;
    border: 1px solide #e0e0e0;
    background-color: #fff;
  `;

  const date_range = css`
    display: flex;
    gap: 8px;
    align-items: center;
  `;

  const submit_button = css`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 60px;
    height: 40px;
    background-color: #486284;

    color: #fff;
    font-family: "Noto Sans KR";
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
  `;

  const info_container = css`
    width: 100%;
    padding-bottom: 50px;
    border-bottom: 1px solid #486284;
  `;

  const info = css`
    color: #486284;
    font-family: "Noto Sans KR";
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 176%;
  `;

  const order_list = css`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 50px 0;

    border-bottom: 1px solid #e5e5e5;

    margin-bottom: 60px;

    color: #486284;
    text-align: center;
    font-family: "Noto Sans KR";
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 35px; /* 269.231% */
  `;

  return (
    <div css={container}>
      <p css={title}>주문조회</p>
      <Tabs
        tab1={{ text: "주문내역 조회(0)", width: "228px" }}
        tab2={{ text: "취소/반품/교환 내역 (0)", width: "228px" }}
      />
      <div css={filter_box}>
        <div css={[filter_select_box, text_light]}>
          <p>전체 주문처리상태</p>
          <Arrow />
        </div>

        <div css={filter_button_container}>
          <div css={[filter_button, text_light]}>오늘</div>
          <div css={[filter_button, text_light]}>1개월</div>
          <div css={[filter_button, text_light, filter_button_selected]}>
            3개월
          </div>
          <div css={[filter_button, text_light, filter_button_last]}>6개월</div>
        </div>

        <div css={date_range_container}>
          <div css={date_range}>
            <div css={date_range_box}>
              <p css={text_light}>2024-01-05</p>
            </div>
            <Calendar />
          </div>
          <p>~</p>
          <div css={date_range}>
            <div css={date_range_box}>
              <p css={text_light}>2024-01-05</p>
            </div>
            <Calendar />
          </div>
          <div css={submit_button}>조회</div>
        </div>
      </div>
      <div css={info_container}>
        <p css={info}>
          - 기본적으로 최근 3개월간의 자료가 조회되며, 기간 검색시 주문처리완료
          후 36개월 이내의 주문내역을 조회하실 수 있습니다.
        </p>
        <p css={info}>
          - 완료 후 36개월 이상 경과한 주문은 [과거주문내역]에서 확인할 수
          있습니다.
        </p>
        <p css={info}>
          - 리뉴얼 전에 주문한 내역은 [이전 주문내역]에서 확인할 수 있습니다.
        </p>
      </div>
      <div css={order_list}>
        <p>주문 내역이 없습니다.</p>
      </div>
    </div>
  );
}

export default function OrderList() {
  const container = css`
    width: 100%;
  `;

  return (
    <OuterWrap padding="100px 0">
      <ContentsWrap>
        <div css={container}>
          <OrderListTitle />
          <OrderListFilterSearch />
          <Pagination isOnePage={true} />
        </div>
      </ContentsWrap>
    </OuterWrap>
  );
}
