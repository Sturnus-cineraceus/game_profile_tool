<template>
  <div>
    <Header></Header>
    <div class="contents">
      <b-overlay class="basic_profile" :show="overlay_show" rounded="sm">
        <b-card-group deck>
          <b-card class="prof_card" title="基本プロフィール">
            <b-nav card-header align="end">
              <b-nav-item-dropdown right :no-caret="true">
                <template slot="button-content">
                  <b-icon-list class="edit_ham_icon"></b-icon-list>
                </template>
                <b-dropdown-item v-b-modal.delete-modal
                  >プロフィール削除</b-dropdown-item
                >
              </b-nav-item-dropdown>
            </b-nav>
            <div class="card_contents">
              <b-form-group id="epic_name_group" label="EpicID:">
                <b-form-input
                  id="team"
                  v-model="form.epic_name"
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group id="team_group" label="チーム名">
                <b-form-input
                  id="team"
                  v-model="form.team"
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group id="message_group" label="ひとこと">
                <b-form-textarea
                  id="textarea"
                  v-model="form.message"
                  placeholder="伝えたいことを書いてください"
                  rows="3"
                  max-rows="10"
                ></b-form-textarea>
              </b-form-group>

              <b-form-group id="sex_group" label="性別" label-for="input-2">
                <b-form-select
                  v-model="form.sex"
                  :options="sex_opt"
                ></b-form-select>
              </b-form-group>

              <b-form-group id="strength_group" label="強さ">
                <b-form-select
                  v-model="form.strength"
                  :options="strength_opt"
                ></b-form-select>
              </b-form-group>

              <b-form-group id="play_group" label="よく遊んでるモード">
                <b-form-select
                  v-model="form.play"
                  :options="play_opt"
                ></b-form-select>
              </b-form-group>

              <b-form-group id="important_group" label="ゲームで目指したいこと">
                <b-form-select
                  v-model="form.important"
                  :options="important_opt"
                ></b-form-select>
              </b-form-group>

              <b-form-group id="time_group" label="遊んでる時間">
                <b-form-select
                  v-model="form.time"
                  :options="time_opt"
                ></b-form-select>
              </b-form-group>

              <b-form-group id="ctrler_group" label="コントローラー">
                <b-form-select
                  v-model="form.ctrler"
                  :options="ctrler_opt"
                ></b-form-select>
              </b-form-group>

              <b-form-group id="device_group" label="デバイス">
                <b-form-select
                  v-model="form.device"
                  :options="device_opt"
                ></b-form-select>
              </b-form-group>

              <b-form-group id="vc_group" label="ボイスチャット">
                <b-form-select
                  v-model="form.vc"
                  :options="vc_opt"
                ></b-form-select>
              </b-form-group>

              <div class="tweet_area">
                <hr />
                <b-form-group
                  id="vc_group"
                  label-cols-sm="2"
                  label="ツイート埋め込み"
                  label-align-sm="left"
                >
                  <b-form-group
                    label="キャプション"
                    label-for="tweet_caption"
                    label-cols-sm="2"
                    label-align-sm="right"
                  >
                    <b-form-input
                      id="tweet_caption"
                      v-model="form.tweet.caption"
                    ></b-form-input>
                  </b-form-group>
                  <b-form-group
                    label="ツイートのURL"
                    label-for="tweet_url"
                    label-cols-sm="2"
                    label-align-sm="right"
                  >
                    <b-form-input
                      id="tweet_url"
                      v-model="form.tweet.url"
                      :state="url_valid"
                      type="url"
                      placeholder="https://twitter.com/glorificatio/status/xxxxxxxxxxxxxxxx"
                    ></b-form-input>
                  </b-form-group>
                </b-form-group>
              </div>
              <hr />
              <b-form-checkbox v-model="form.available" name="available" switch>
                <p v-if="!form.available">非公開</p>
                <p v-if="form.available">公開中</p>
              </b-form-checkbox>
            </div>
            <div class="edit_btns">
              <b-button
                variant="success"
                class="write_btn"
                @click="post_profile()"
                >書き込む</b-button
              >
            </div>
          </b-card>
          <b-card class="prof_card" title="プロフィール画像">
            <b-form-file
              accept="image/jpeg, image/png, image/gif"
              v-model="image_file"
              class="mt-3"
              plain
              @change="write_base64"
            ></b-form-file>
            <div class="edit_btns">
              <b-button
                variant="success"
                class="write_btn"
                @click="upload_image()"
                >画像保存</b-button
              >
            </div>
            <div class="profi_image_area">
              <h5>プレビュー</h5>
              <div class="profi_image_core">
                <template v-if="preview_img !== ''">
                  <b-img :src="preview_img" fluid alt="Fluid image"></b-img>
                </template>
              </div>
            </div>
            <div class="profi_image_area">
              <h5>登録中画像</h5>
              <div class="profi_image_core">
                <template v-if="preview_img !== ''">
                  <b-img :src="preview_img" fluid alt="Fluid image"></b-img>
                </template>
              </div>
            </div>
          </b-card>
        </b-card-group>
      </b-overlay>
    </div>
    <Footer></Footer>
    <!-- The modal -->
    <b-modal id="delete-modal" @ok="delete_profile"
      >削除してよろしいですか</b-modal
    >
  </div>
</template>
<script>
import axios from "axios";
import Header from "@/components/header";
import Footer from "@/components/footer";
export default {
  components: { Header, Footer },
  name: "ProfileEdit",
  head: function () {
    return { title: "自分のことを書こう" };
  },
  data: () => ({
    user: null,
    overlay_show: true,
    existsProfile: false,
    image_file: [],
    preview_img: "",
    form: {
      twitter_id: null,
      epic_name: "",
      sex: 0,
      strength: 0,
      play: 0,
      important: 0,
      vc: 0,
      time: 0,
      device: 0,
      ctrler: 0,
      message: "",
      team: "",
      twitter_name: "",
      twitter_screen_name: "",
      twitter_url: "",
      twitter_image_url: "",
      available: true,
      user_id: "",
      tweet: { url: "", caption: "" },
    },
    sex_opt: [
      { value: "0", text: "" },
      { value: "1", text: "男性" },
      { value: "2", text: "女性" },
      { value: "3", text: "その他" },
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
      { value: "4", text: "だいたいオンです" },
      { value: "5", text: "仲良くなったらできます" },
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
  computed: {
    url_valid() {
      if (!this.form.tweet.url) {
        return true;
      }
      if (this.form.tweet.url.startsWith("https://twitter.com/")) {
        return true;
      }
      return false;
    },
  },
  async mounted() {
    this.overlay_show = true;
    this.$authUtil
      .permitLogin()
      .then(async () => {
        this.user = this.$store.state.user.data;
        this.$logger.debug("ユーザーデータ", this.user);
        let user_id = this.user.twitter_data.user_id;
        this.form.user_id = user_id;
        try {
          let initData = await axios.get("/v1/api/profile/" + user_id);
          this.$logger.debug("プロフィールデータ", initData);
          this.form = initData.data;
          this.existsProfile = true;
        } catch (e) {
          this.$logger.debug(e);
          if (e.response && e.response.status === 403) {
            window.location.href = "/";
          }
          this.$logger.info("not found profile data");
        }
        this.form.twitter_id = this.user.twitter_data.id;
        this.form.twitter_name = this.user.twitter_data.user_name;
        this.form.twitter_screen_name = this.user.twitter_data.screen_name;
        this.form.twitter_image_url = this.user.twitter_data.profile_image;
        this.form.twitter_url = this.user.twitter_data.twitter_url;
      })
      .finally(() => {
        this.overlay_show = false;
      });
  },
  methods: {
    write_base64: function (event) {
      const reader = new FileReader();
      const file = event.target.files[0];

      if (file) {
        reader.readAsDataURL(file);
      } else {
        this.preview_img = "";
      }

      // 変換が終わったら実行される
      reader.onload = () => {
        this.preview_img = reader.result;
      };
    },
    upload_image: function () {
      this.overlay_show = true;
      let params = new FormData();
      console.log(this.image_file, this.form.user_id);
      params.append("image", this.image_file);
      params.append("user_id", this.form.user_id);

      console.log(params);

      axios
        .post("/v1/api/image", params)
        .then((res) => {
          this.$bvToast.toast("画像を保存しました", {
            variant: "success",
            autoHideDelay: 5000,
            solid: true,
          });
        })
        .catch((e) => {
          this.$bvToast.toast("画像の保存に失敗しました", {
            variant: "danger",
            autoHideDelay: 5000,
            solid: true,
          });
          this.$logger.error(e);
        })
        .finally(() => {
          this.overlay_show = false;
        });
    },
    delete_profile: function (bvModalEvt) {
      this.overlay_show = true;
      axios
        .delete("/v1/api/profile/" + this.user.twitter_data.user_id)
        .then((res) => {
          this.$bvToast.toast("削除しました", {
            variant: "success",
            autoHideDelay: 5000,
            solid: true,
          });
          this.$router.push({ path: "/" });
        })
        .catch((e) => {
          this.$bvToast.toast("削除に失敗しました", {
            variant: "danger",
            autoHideDelay: 5000,
            solid: true,
          });
          this.$logger.error(e);
        })
        .finally(() => {
          this.overlay_show = false;
        });
    },
    post_profile: function () {
      if (!this.url_valid) {
        this.$bvToast.toast("埋め込みツイート用URLが不正です", {
          variant: "danger",
          autoHideDelay: 5000,
          solid: true,
        });
        return;
      }

      this.overlay_show = true;
      axios
        .post("/v1/api/profile", this.form)
        .then((res) => {
          this.$bvToast.toast("保存しました", {
            variant: "success",
            autoHideDelay: 5000,
            solid: true,
          });
        })
        .catch((e) => {
          this.$bvToast.toast("保存に失敗しました", {
            variant: "danger",
            autoHideDelay: 5000,
            solid: true,
          });
          this.$logger.error(e);
        })
        .finally(() => {
          this.overlay_show = false;
        });
    },
  },
};
</script>
<style lang="scss">
.edit_ham_icon {
  width: 32px;
  height: 32px;
}
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
      max-width: 35em;
      color: black;
    }
    textarea {
      color: black;
    }
  }
}
div.tweet_area {
  padding-top: 2em;
}
div.edit_btns {
  .btn {
    margin-top: 0.5em;
    margin-left: 0.5em;
    padding: 1em;
    font-size: 1em;
  }
}
.prof_card {
  min-width: 600px;
  .profi_image_area {
    margin-top: 2em;
    .profi_image_core {
      border: 1px solid;
      min-height: 5em;
    }
  }
}
</style>