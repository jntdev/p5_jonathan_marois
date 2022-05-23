
const url = new URL(window.location.href);
const id = url.searchParams.get("id");

function showOrderId() {
  document.getElementById("orderId").innerText = id;
}

showOrderId();