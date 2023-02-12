import axios from "axios";

class APIService {

    headers: any = {
        "Content-type": "application/json",
        'Accept': 'application/json',
    }

    mainURL: string = "https://localhost:44312/api/"

    //====================== UseQuery Methods==================

    get = async (methodName: string) => {
        const response = await axios.get(this.mainURL + methodName, this.headers);
        return response?.data;
    };

    post = async (methodName: string, params: any) => {
        const response = await axios.post(this.mainURL + methodName, params, this.headers);
        return response?.data;
    }

    delete = async (methodName: string) => {
        const response = await axios.delete(this.mainURL + methodName);
        return response?.data;
    };


}

export default new APIService();

