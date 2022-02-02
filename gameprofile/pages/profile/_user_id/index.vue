<template>
  <div>
    <Header></Header>
    <div class="profilem_main">
      <b-container class="prof_cont">
        <b-row>
          <b-col cols="3">EpicID</b-col>
          <b-col>{{ profile_data.epic_name }}</b-col>
          <b-col cols="3" class="twocol">性別</b-col>
          <b-col>{{ sex }}</b-col>
        </b-row>

        <b-row>
          <b-col cols="3">Twitter</b-col>
          <b-col>
            <a
              class="prf_link"
              :href="profile_data.twitter_url"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span class="tw_name">
                <b-avatar
                  class="tw_avt"
                  :src="profile_img"
                  size="4rem"
                ></b-avatar>
                <span class="tw_name">{{ profile_data.twitter_name }}</span>
                <b-icon-box-arrow-up-right></b-icon-box-arrow-up-right> </span></a
          ></b-col>
        </b-row>

        <b-row>
          <b-col cols="3">チーム名</b-col>
          <b-col>
            <pre>{{ profile_data.team }}</pre>
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="3">メッセージ</b-col>
          <b-col>
            <pre>{{ profile_data.message }}</pre>
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="3">いろんなこと</b-col>
          <b-col>
            <p>{{ playmode }}</p>
            <p>{{ strength }}</p>
            <p>{{ time }}</p>
            <p>{{ device }}</p>
            <p>{{ ctrler }}</p>
            <p>{{ voice }}</p>
            <p>{{ important }}</p>
          </b-col>
        </b-row>
      </b-container>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import Header from "@/components/header";
import Footer from "@/components/footer";
import axios from "axios";
export default {
  components: { Header, Footer },
  name: "Profile",
  async asyncData({ route, error }) {
    try {
      let res = await axios.get(
        "http://localhost:3000/v1/api/user_profile/" + route.params.user_id
      );
      console.log(res.data);
      return { profile_data: res.data };
    } catch (e) {
      error({ statusCode: 404, message: "Profile not found" });
      return;
    }
  },
  computed: {
    profile_img: function () {
      return this.profile_data.twitter_image_url.replace("normal", "bigger");
    },
    sex: function () {
      const sexobj = ["", "男性", "女性", "その他"];
      return sexobj[this.profile_data.sex];
    },
    playmode: function () {
      const plyary = [
        "",
        "ソロ",
        "デュオ",
        "トリオ",
        "スクワッド",
        "アリーナ ソロ",
        "アリーナ デュオ",
        "アリーナ トリオ",
        "チームランブル",
        "クリエイティブ",
        "スクリム",
        "その他",
      ];

      let ply = this.profile_data.play;
      if (ply === 0) {
        return "";
      }
      return "いつも遊んでいるゲームモードは、" + plyary[ply] + "です";
    },

    strength: function () {
      const stgtary = [
        "",
        "始めたばかり",
        "初キル済み",
        "壁や階段は出せる",
        "ソロでビクロイはした",
        "建築バトルできる",
        "編集活用してバトルできる",
        "10キル以上余裕",
        "チャンピオンリーグ常連",
        "競技に本気",
        "プロとして生計を立てている",
      ];

      let strg = this.profile_data.strength;
      if (strg === 0) {
        return "";
      }
      return "強さは、『" + stgtary[strg] + "』です";
    },
    time: function () {
      const timeary = ["", "早朝", "日中帯", "夕方", "夜", "深夜"];

      let timenum = this.profile_data.time;
      if (timenum === 0) {
        return "";
      }
      return "いつも" + timeary[timenum] + "あたりで遊んでいます";
    },

    device: function () {
      const dvary = [
        "",
        "Switch",
        "PlayStation4",
        "PlayStation5",
        "XBox",
        "PC",
        "モバイル",
      ];
      let devicenum = this.profile_data.device;
      if (devicenum === 0) {
        return "";
      }
      return "使っているゲーム機は、" + dvary[devicenum] + "です";
    },

    ctrler: function () {
      const ctary = ["", "パッド", "キーマウ"];
      let ctrlernum = this.profile_data.ctrler;
      if (ctrlernum === 0) {
        return "";
      }
      return "使っているコントローラーは、" + ctary[ctrlernum] + "です";
    },
    voice: function () {
      const vcary = [
        "",
        "VCできません",
        "たまにできます",
        "いつでもオンです",
        "たまにできません",
        "仲良くなったらできます",
      ];
      let vcnum = this.profile_data.vc;
      if (vcnum === 0) {
        return "";
      }
      return "ボイスチャットは" + vcary[vcnum];
    },
    important: function () {
      const importantary = [
        "",
        "みんなと協力してバトルしたい",
        "おしゃべりしたい ロビーにいるだけでもいい！",
        "ビクロイしたい",
        "たくさんキルしたい",
        "珍しい戦い方を検証したい",
        "フォートナイト考察のために島を回りたい",
        "クエストをクリアしたい",
        "動画映えするプレイを極めたい",
        "アリーナポイントためたい",
        "大会で良い成績を残したい",
      ];

      let importantnum = this.profile_data.important;
      if (importantnum === 0) {
        return "";
      }
      return (
        "このゲームで重視していることは、『" +
        importantary[importantnum] +
        "』です"
      );
    },
  },
};
</script>
<style lang="scss">
a.prf_link {
  // color: #6610f2;
  font-weight: bold;
}
.tw_name {
  .tw_avt,
  .tw_name {
    margin-right: 1em;
  }
}
.profilem_main {
  padding-top: 3em;
  padding-bottom: 3em;
  .prof_cont {
    border: 1px solid warning;
    .row {
      background-color: rgba(23, 162, 184, 0.1);
      margin-top: 0.8em;
      border: 1px solid #000000;
      .col {
        padding-top: 2em;
        padding-bottom: 1em;
        border-left: 1px solid #000000;
        background-color: var(--white);
      }
      .col-3 {
        padding-top: 2em;
        padding-bottom: 1em;
      }
      .twocol {
        border-left: 1px solid #000000;
      }
    }
  }
}
</style>