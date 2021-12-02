<template>
  <button class="buy-tickets-btn" ><slot /></button>
</template>

<style lang="scss">
.buy-tickets-btn {
  border-radius: 30px;
  height: 35px;
  width: 150px;
  margin-top: 20px;
  background-color: transparent;
  color: white;
  border: white 2px solid;
  cursor: pointer;
  transition: 0.5s;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;

  &:hover {
    background-color: white;
    color: #ff4545;
  }

  &:disabled {
    color: grey;
    border: grey 2px solid;
    cursor: auto;

    &:hover {
      color: grey;
      border: grey 2px solid;
      background-color: transparent;
    }
  }
}
.dark-button {
  color: rgb(30, 30, 30);
  border: rgb(30, 30, 30) 2px solid;

  &:hover {
    color: gray;
    border: grey 2px solid;
  }
}
</style>
