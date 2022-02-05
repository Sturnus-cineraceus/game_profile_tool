<template>
    <div class="main">
        <Header></Header>
        <div class="contents">
            <h1>当アプリの利用について</h1>
            <article>
                <p>
                    フォトナプロフ（以下、当アプリ）は
                    <a href="https://twitter.com/glorificatio">@glorificatio</a>
                    が作成、運営しています。
                </p>
                <p>予告なくアップデート、メンテナンスによる停止、サービスの終了があることをご了承ください。</p>
                <p>運営には細心の注意を払っていますが、サービスの運営の完全性は保証しません。</p>
                <p>データの消失がありましても責任は負いかねますので、ご了承の上ご利用ください。</p>
                <p>
                    サービスの運営用の安定やサービスの風紀を守るため、私
                    <a
                        href="https://twitter.com/glorificatio"
                    >@glorificatio</a>
                    が不適切だと判断した場合、プロフィールを削除、アカウントをブロックすることがあります。
                </p>
                <p>プロフィールの内容の知的財産権は、プロフィール作成者に帰属します。</p>
                <p>
                    当サイトで利用しているフォートナイトの画像及び商標権、その他知的財産権は当該コンテンツ提供元に帰属します。
                    <br />(C)Epic Games, Inc. All Rights Reserved.
                    <br />
                    <a href="https://www.epicgames.com/fortnite/ja/home">フォートナイト公式サイト</a>
                </p>
                <p>当サイトの利用は自己責任とし、当サイトで発生したいかなる損害に関して、一切責任を負うものではありません。</p>
            </article>
            <h1>禁止事項</h1>
            <article>
                <p>以下の内容を記載することを禁止します。</p>
                <p>発覚した場合は予告なしに削除、アカウントをブロックいたします。</p>
                <ul>
                    <li>個人を特定できる情報の記載（住所、電話番号、勤務先等）</li>
                    <li>差別的、攻撃的、暴力的な内容の記載</li>
                    <li>犯罪および犯罪を助長する内容の記載</li>
                    <li>スパムやスパムサイトへの誘導を目的とした内容の記載</li>
                    <li>直接的な表現ではなくとも、人を不快にさせることを目的にしている内容の記載</li>
                    <li>人を不快にさせる目的でなくとも、誤解を与えやすい表現を使うこと</li>
                    <li>他人を騙り嘘の情報を書くこと</li>
                    <li>他者の権利を侵害する内容の記載</li>
                    <li>公序良俗に反すること</li>
                    <li>運営者が不適切だと判断する内容</li>
                </ul>
            </article>
            <h1>プライバシーポリシー</h1>
            <article>
                <p>当サイトは以下の情報を取得しています</p>
                <ul>
                    <li>Twitterの情報</li>
                    <li>アクセスログ</li>
                </ul>
                <h3>利用目的</h3>
                <p>以下の目的で情報を利用します</p>
                <ul>
                    <li>ログインしたTwitterユーザーとプロフィールの紐付け</li>
                    <li>Twitterの投稿時に利用</li>
                    <li>アクセス時のログに関しては、安全性向上のため</li>
                </ul>
                <h3>開示について</h3>
                <p>これらの情報は第三者に開示することはありません。</p>
                <p>ただし以下の場合は除きます</p>
                <ul>
                    <li>本人の合意による場合</li>
                    <li>捜査機関や司法機関などにより、開示に関して法的義務を負っている場合</li>
                    <li>不正利用が疑われる場合</li>
                    <li>運営者または、第三者の権利や財産を保護するために必要だと判断した場合</li>
                </ul>
                <h3>TwitterAPIについて</h3>
                <p>当サービスから、ユーザーの意図しないタイミングでの自動でツイートをすることはありません</p>
                <p>APIの利用は、ユーザー情報の利用、およびユーザーが管理可能なタイミングでのツイート投稿の利用に限定しています</p>
                <h3>Cookieについて</h3>
                <p>ログイン情報の保持のためにCookieを使用しております。</p>
            </article>
        </div>
        <Footer></Footer>
    </div>
</template>
<script>
import Header from "@/components/header";
import Footer from "@/components/footer";
export default {
    components: { Header, Footer },
    head: function () {
        return { title: "各種ポリシー" }
    }
}
</script>
<style lang="scss">
.contents {
    @media screen and (min-width: 480px) {
        padding: 5em;
    }
    padding: 2em;
}
</style>
