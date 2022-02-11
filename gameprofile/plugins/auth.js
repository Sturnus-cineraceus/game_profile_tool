import axios from "axios";


export default ({ store }, inject) => {

    const auth = {
        verifyAuth: async () => {
            try {
                let url = "/v1/api/user_name";
                if (!store.state.user.data.twitter_data) {
                    let response = await axios.get(url);
                    let userData = response.data;
                    store.commit("user/set", userData);
                }
            } catch (e) {
                console.log(e)
            }
        },
        permitLogin: async () => {
            await auth.verifyAuth();
            if (!store.state.user.data.twitter) {
                window.location.href = "/"
            }
        },
        permitModerator: async () => {
            await auth.permitLogin();
            let url = "/v1/api/moderator_status";
            let response = await axios.get(url);
            console.log(response.data)
            let modData = response.data;
            if (!modData.status) {
                throw new Error("no moderetar");
            }
        }
    }

    inject('authUtil', auth)
}