<template>
  <div>
    <Header></Header>
    <div class="contents">
      <b-card-group deck class="basic_profile">
        <b-card title="基本プロフィール">
          <div class="card_contents">
            <b-form-group
              id="epic_name_group"
              label="EpicID:"
              label-for="input-2"
            >
              <b-form-input
                id="team"
                v-model="form.name"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group id="team_group" label="チーム名" label-for="input-2">
              <b-form-input
                id="team"
                v-model="form.team"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group id="sex_group" label="性別" label-for="input-2">
              <b-form-select
                v-model="form.sex"
                :options="sex_opt"
              ></b-form-select>
            </b-form-group>

            <b-form-group id="strength_group" label="強さ" label-for="input-2">
              <b-form-select
                v-model="form.strength"
                :options="strength_opt"
              ></b-form-select>
            </b-form-group>

            <b-form-group
              id="play_group"
              label="よく遊んでるモード"
              label-for="input-2"
            >
              <b-form-select
                v-model="form.play"
                :options="play_opt"
              ></b-form-select>
            </b-form-group>

            <b-form-group
              id="important_group"
              label="ゲームで目指したいこと"
              label-for="input-2"
            >
              <b-form-select
                v-model="form.important"
                :options="important_opt"
              ></b-form-select>
            </b-form-group>

            <b-form-group
              id="time_group"
              label="遊んでる時間"
              label-for="input-2"
            >
              <b-form-select
                v-model="form.time"
                :options="time_opt"
              ></b-form-select>
            </b-form-group>

            <b-form-group
              id="ctrler_group"
              label="コントローラー"
              label-for="input-2"
            >
              <b-form-select
                v-model="form.ctrler"
                :options="ctrler_opt"
              ></b-form-select>
            </b-form-group>

            <b-form-group
              id="device_group"
              label="デバイス"
              label-for="input-2"
            >
              <b-form-select
                v-model="form.device"
                :options="device_opt"
              ></b-form-select>
            </b-form-group>

            <b-form-group
              id="vc_group"
              label="ボイスチャット"
              label-for="input-2"
            >
              <b-form-select
                v-model="form.vc"
                :options="vc_opt"
              ></b-form-select>
            </b-form-group>

            <b-form-group
              id="message_group"
              label="ひとこと"
              label-for="input-2"
            >
              <b-form-textarea
                id="textarea"
                v-model="form.message"
                placeholder="伝えたいことを書いてください"
                rows="3"
                max-rows="10"
              ></b-form-textarea>
            </b-form-group>
          </div>
          <b-button variant="success">書き込む</b-button>
        </b-card>
      </b-card-group>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import axios from "axios";
import Header from "@/components/header";
import Footer from "@/components/footer";
export default {
  components: { Header, Footer },
  name: "ProfileEdit",
  data: () => ({
    hoge: "das",
    epic_name: "",
    form: {
      name: "",
      sex: null,
      strength: null,
      play: null,
      important: null,
      vc: null,
      time: null,
      device: null,
      ctrler: null,
      message: "",
      team: "",
    },
    sex_opt: [
      { value: "n", text: "" },
      { value: "m", text: "男性" },
      { value: "f", text: "女性" },
      { value: "x", text: "その他" },
    ],
    strength_opt: [
      { value: "0", text: "" },
      { value: "1", text: "1 始めたばかり" },
      { value: "2", text: "2 初キル済み" },
      { value: "3", text: "3 壁や階段は出せる" },
      { value: "4", text: "4 ソロでビクロイはした" },
      { value: "5", text: "5 建築バトルできる" },
      { value: "6", text: "6 編集活用してバトルできる" },
      { value: "7", text: "7 10キル以上余裕" },
      { value: "8", text: "8 チャンピオンリーグ常連" },
      { value: "9", text: "9 競技に本気" },
      { value: "10", text: "10 プロとして生計を立てている" },
    ],
    play_opt: [
      { value: "0", text: "" },
      { value: "1", text: "ソロ" },
      { value: "2", text: "デュオ" },
      { value: "3", text: "トリオ" },
      { value: "4", text: "スクワッド" },
      { value: "5", text: "アリーナ ソロ" },
      { value: "6", text: "アリーナ デュオ" },
      { value: "7", text: "アリーナ トリオ" },
      { value: "8", text: "チームランブル" },
      { value: "9", text: "クリエイティブ" },
      { value: "10", text: "スクリム" },
      { value: "11", text: "その他" },
    ],
    important_opt: [
      { value: "0", text: "" },
      { value: "1", text: "みんなと協力してバトルしたい" },
      { value: "2", text: "おしゃべりしたい ロビーにいるだけでもいい！" },
      { value: "3", text: "ビクロイしたい" },
      { value: "4", text: "たくさんキルしたい" },
      { value: "5", text: "珍しい戦い方を検証したい" },
      { value: "6", text: "フォートナイト考察のために島を回りたい" },
      { value: "7", text: "クエストをクリアしたい" },
      { value: "8", text: "動画映えするプレイを極めたい" },
      { value: "9", text: "アリーナポイントためたい" },
      { value: "10", text: "大会で良い成績を残したい" },
    ],
    vc_opt: [
      { value: "0", text: "" },
      { value: "1", text: "VCできません" },
      { value: "2", text: "たまにできます" },
      { value: "3", text: "いつでもオンです" },
      { value: "4", text: "たまにできません" },
      { value: "5", text: "仲良くなったら" },
    ],
    time_opt: [
      { value: "0", text: "" },
      { value: "1", text: "早朝" },
      { value: "2", text: "日中帯" },
      { value: "3", text: "夕方" },
      { value: "4", text: "夜" },
      { value: "5", text: "深夜" },
    ],
    ctrler_opt: [
      { value: "0", text: "" },
      { value: "1", text: "パッド" },
      { value: "2", text: "キーマウ" },
    ],
    device_opt: [
      { value: "0", text: "" },
      { value: "1", text: "Switch" },
      { value: "2", text: "PlayStation4" },
      { value: "3", text: "PlayStation5" },
      { value: "4", text: "XBox" },
      { value: "5", text: "PC" },
      { value: "6", text: "モバイル" },
    ],
  }),
  async mounted() {
    this.$authUtil.permitLogin().then(() => {
      // this.user = this.$store.state.user.data;
      // this.userName = this.user.twitter_data.user_name;
      // this.login = this.user.twitter;
    });
  },
  methods: {
    click: function () {
      let user = this.$store.state.user.data;
      console.log(user);
      if (!user.twitter_data) {
        console.log("ほげ");
        window.location.href = "/";
        return;
      }
      console.log(user);
      let data = {
        twitter_id: user.twitter_data.id,
        epic_name: this.epic_name,
      };

      axios.post("/v1/api/profile", data).catch((e) => {
        console.log(e);
      });
    },
  },
};
</script>
<style lang="scss">
div.contents {
  display: flex;
  justify-content: center;
  align-items: center;
  .basic_profile {
    padding-top: 5em;
    padding-bottom: 10em;
    width: 80%;
    input,
    select {
      max-width: 25em;
    }
  }
}
</style>