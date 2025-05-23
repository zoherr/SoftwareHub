import api from "./api";

const setUser = async () => {
    try {
        const res = await api.get("/user/me");
        if (res.success) {
            localStorage.setItem("currentUser", JSON.stringify(res.data));
        } else {
            localStorage.setItem("currentUser", null);
        }
    } catch (error) {
        console.log("Error fetching user:", error);
    }
}

export default setUser;