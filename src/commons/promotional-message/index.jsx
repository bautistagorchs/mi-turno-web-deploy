import React from "react";

const PromotionalMessage = () => {
  const displayNone = () =>
    document
      .querySelector(".div-promotion-message")
      .classList.add("display-none");
  return (
    <div>
      <div className="div-promotion-message">
        <p className="p-promotion-message">
          Project made by: Hernan - Luis - Rosmari - Boris - Bautista
        </p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          style={{
            position: "absolute",
            left: "97.5%",
          }}
          onClick={displayNone}
        >
          <path
            d="M5.73167 18.2929C6.12219 18.6834 6.75536 18.6834 7.14588 18.2929L12 13.4388L16.8541 18.2929C17.2446 18.6834 17.8778 18.6834 18.2683 18.2929L18.2929 18.2683C18.6834 17.8778 18.6834 17.2446 18.2929 16.8541L13.4388 12L18.2929 7.14588C18.6834 6.75536 18.6834 6.12219 18.2929 5.73167L18.2683 5.70711C17.8778 5.31658 17.2446 5.31658 16.8541 5.70711L12 10.5612L7.14588 5.70711C6.75536 5.31658 6.12219 5.31658 5.73167 5.70711L5.70711 5.73167C5.31658 6.12219 5.31658 6.75536 5.70711 7.14588L10.5612 12L5.70711 16.8541C5.31658 17.2446 5.31658 17.8778 5.70711 18.2683L5.73167 18.2929Z"
            fill="#a542f1cb"
          />
        </svg>
      </div>
    </div>
  );
};

export default PromotionalMessage;
