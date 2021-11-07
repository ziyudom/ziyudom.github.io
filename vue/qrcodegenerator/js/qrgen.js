/*　いいもん ひとりでやるもんできるもん */
new Vue({
    el:"#vue-directory",
    data: {
        //ドラッグ&ドロップ
        isEnter: false,
        //QRコードリスト
        qrlist: [
        ],
        //2列表示
        isCol2: true
    },
    mounted() {
        this.generateQRCode();
    },
    updated(){
        this.generateQRCode();
    },
    methods: {
        /*-- scv読み込み --*/
        loadCsvFile(e) {
            let file = e.target.files[0];
            this.readFile(file);
        },
        //ファイル取得
        readFile(e){
            //クラスenter用解除
            this.isEnter = false;
            let ext = this.getExtension(e.name);
            //拡張子チェック
            if(ext != "csv"){
                alert("【."+ext+"】ってCSVすかそれ？");
                return false;
            }
            //データ取得
            let vm = this;
            vm.qrlist = [];

            let reader = new FileReader();
            reader.readAsText(e);
        
            reader.onload = () => {
                let lines = reader.result.split("\n");
                let linesArr = [];
                for (let i = 0; i < lines.length; i++) {
                    //,でスプリット
                    temp_lisnes = lines[i].split(",");
                    linesArr[i] = {
                        "url" : lines[i].split(",")[0],
                        "title" : lines[i].split(",")[1]
                    }
                }
                vm.qrlist = linesArr;
            };
        },
        fileDragEnter() {
            this.isEnter = true;
        },
        fileDragLeave() {
            this.isEnter = false;
        },
        fileDrop(e) {
            let file = e.dataTransfer.files[0]
            this.readFile(file);
        },
        /*-- QRコード生成 --*/
        generateQRCode(){
            let qrArr = Array.from(document.getElementsByClassName('js-qr'));
            qrArr.forEach(e => {
                //innerHtml削除
                e.innerHTML = ""
                //QRコード生成
                let qrcode = new QRCode(e,{
                    width: 100,
                    height: 100,
                    colorDark : "#000000",
                    colorLight : "#ffffff"
                });
                //コード生成
                qrcode.makeCode(e.dataset.url);
            });
        },
        /*-- 拡張子取得 --*/
        getExtension(filename){
            var pos = filename.lastIndexOf('.');
            if (pos === -1) return '';
            return filename.slice(pos + 1);
        }
    }
});