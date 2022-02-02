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
          </b-col>
        </b-row>
      </b-container>
    </div>
    {{ profile_data }}
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