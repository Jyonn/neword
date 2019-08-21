class Neword {
    static CharTemplate = template`
    <div class="cross-box">
        <div class="square left top"></div>
        <div class="square left bottom"></div>
        <div class="square right top"></div>
        <div class="square right bottom"></div>
        <div class="sub-box">
            <div class="skew-box top-left"></div>
        </div>
        <div class="sub-box">
            <div class="skew-box bottom-right"></div>
        </div>
        <div class="sub-box">
            <div class="text">${0}</div>
        </div>
    </div>
    `;

    constructor({titleBox, pinyinBox, contentTitle, contentDesc, inputBox}) {
        this.titleBox = document.getElementById(titleBox);
        this.pinyinBox = document.getElementById(pinyinBox);
        this.contentTitle = document.getElementById(contentTitle);
        this.contentDesc = document.getElementById(contentDesc);
        this.inputBox = document.getElementById(inputBox);

        this.inputBox.value = '英年早婚';
        this.setText(this.inputBox.value);

        this.inputBox.addEventListener('input', () => {
            this.setText(this.inputBox.value);
        });
    }

    setText(text) {
        this.titleBox.innerHTML = '';
        for (let c of text) {
            let html = stringToHtml(Neword.CharTemplate(c));
            this.titleBox.appendChild(html);
        }
        Request.post('https://tools.6-79.cn/v1/language/character-to-pinyin', {text: text})
            .then(body => {
                this.pinyinBox.innerText = body.join(' ');
            });
        this.contentTitle.innerText = text + '：';
    }
}

