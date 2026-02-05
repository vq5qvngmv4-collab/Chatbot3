(function () {
  const server = document.currentScript.dataset.server;

  const bubble = document.createElement("div");
  bubble.style.position = "fixed";
  bubble.style.bottom = "20px";
  bubble.style.right = "20px";
  bubble.style.zIndex = "9999";

  bubble.innerHTML = `
    <button id="chatBtn">💬 Chat</button>
    <div id="chatBox" style="display:none;width:300px;height:360px;background:#fff;border:1px solid #ccc;padding:10px">
      <div id="messages" style="height:280px;overflow:auto"></div>
      <input id="input" placeholder="Type here..." style="width:100%" />
    </div>
  `;

  document.body.appendChild(bubble);

  const btn = document.getElementById("chatBtn");
  const box = document.getElementById("chatBox");
  const input = document.getElementById("input");
  const messages = document.getElementById("messages");

  btn.onclick = () => {
    box.style.display = box.style.display === "none" ? "block" : "none";
  };

  input.addEventListener("keydown", async e => {
    if (e.key === "Enter") {
      const text = input.value;
      messages.innerHTML += `<div><b>You:</b> ${text}</div>`;
      input.value = "";

      const res = await fetch(server + "/api/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
      });

      const data = await res.json();
      messages.innerHTML += `<div><b>Bot:</b> ${data.reply}</div>`;
      messages.scrollTop = messages.scrollHeight;
    }
  });
})();
