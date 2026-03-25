/*処理「setFAQAnime」を作成する。
            ■処理内容
            折り畳みテキストの「開く/閉じる」状態に合わせて、対応するアニメーションを呼び出して実行する。
            クリックをセンサーで感知し、「開く/閉じる」どちらかのアニメーションを実行する。*/
            const setFAQAnime = (details) => {

                /*固定値設定部分。<summary>要素と<div class="answer">要素を探し、それぞれの名前の箱にセット。*/
                const summary = details.querySelector('summary');
                const answer = details.querySelector('summary + .answer');
    
                /*もしも必要な要素<detail>、<summary>、<div class=".answer"が見つからない場合はここで処理中断。*/
                if (!(details && summary && answer)) {
                console.log("setAnime実行失敗。必要な要素が不足しています。");
                return;
                }
    
                /*連打対策として、今アニメーション中かどうかを識別するスイッチを作成。これがONの時(=すでにアニメ中)はアニメーションさせない。*/
                let isAnimeFlag = false;
    
                /*処理「onOpen」を作成。
                ■処理内容
                折り畳みテキストが開くときのアニメーションを呼び出す*/
                const onOpen = () => {
                /*既に<detail>に[open]属性がついているか、アニメ中なら処理を中断*/
                if (details.open || isAnimeFlag) return;
    
                /*この後一連の流れで、
                1.解答ブロックの高さを0行分に設定
                2.「webページの構造変化が終了した後、解答ブロックの高さを1行分にする」要求
                */
                isAnimeFlag = true;
                answer.style.gridTemplateRows = '0fr';
                details.open = true;
    
                requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                answer.style.gridTemplateRows = '1fr';
                });
                });
    
                /*処理「animeEnd」を作成。
                ■処理内容
                「アニメ中」を示すスイッチをオフにし、要素の変形が完了した場合に反応するセンサー(EventListner)を取り除く。
                */
                const animeEnd = () => {
                isAnimeFlag = false;
                answer.removeEventListener('transitionend', animeEnd);
                };
    
                /*<div class="answer">に、要素の変形が完了した場合に反応するセンサーを設置。センサーが反応したら、処理「animeEnd」を実行させる。*/
                answer.addEventListener('transitionend', animeEnd);
                };
    
                /*処理「onClose」を作成。
                ■処理内容
                折り畳みテキストが閉じるときのアニメーションを呼び出す。大まかな処理はonOpenと同じ。*/
                const onClose = () => {
                if (!details.open || isAnimeFlag) {
                return;
                }
                isAnimeFlag = true;
                answer.style.gridTemplateRows = '0fr';
    
                const animeEnd = () => {
                details.removeAttribute('open');
                answer.style.gridTemplateRows = '';
                answer.removeEventListener('transitionend', animeEnd);
                isAnimeFlag = false;
                }
                answer.addEventListener('transitionend',animeEnd, { once: true },)
                }
    
                /*<summary>がクリックされた時、すでに[open]状態なら「onClose」処理、そうでないなら「onOpen)処理を行う。*/
                summary.addEventListener('click', (event) => {
                /*意図しない処理を避けるため、<summry>に対する自作処理以外のデフォルト処理を無効化する。*/
                event.preventDefault()
    
                if (details.open) {
                onClose()
                } else {
                onOpen()
                }
                })
                }
    
                /*すべてのFAQsクラスを取り出し、そのすべてに処理「setFAQAnime」を行う。*/
                const faqs = [...document.querySelectorAll(".FAQs")];
                faqs.forEach(faq => {
                setFAQAnime(faq);
                });