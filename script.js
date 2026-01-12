function switchTab(tabId, btn) {
    document.querySelectorAll('.editor').forEach(e => e.classList.remove('active'));
    document.querySelectorAll('.tab').forEach(b => b.classList.remove('active'));

    document.getElementById(tabId).classList.add('active');
    btn.classList.add('active');
}

function runCode() {
    const html = document.getElementById("html").value;
    const css = document.getElementById("css").value;
    const js = document.getElementById("js").value;
    const iframe = document.getElementById("output");
    const consoleBox = document.getElementById("console");

    consoleBox.textContent = "";

    const code = `
<!DOCTYPE html>
<html>
<head>
<style>${css}</style>
</head>
<body>
${html}
<script>
(function () {
    const oldLog = console.log;
    console.log = function (...args) {
        parent.document.getElementById("console").textContent += args.join(" ") + "\\n";
        oldLog.apply(console, args);
    };

    try {
        ${js}
    } catch (err) {
        parent.document.getElementById("console").textContent += err + "\\n";
    }
})();
<\/script>
</body>
</html>
`;

    iframe.srcdoc = code;
}
      