export default class ListFood{
    getListFoodAPI(){
        return axios({
            method: "GET",
            url: `https://6111167dc38a0900171f0fda.mockapi.io/Food`
        })
    }

    addFoodAPI(food){
        return axios({
            method: "POST",
            url: `https://6111167dc38a0900171f0fda.mockapi.io/Food`,
            data: food
        })
    }

    deleteFoodAPI(id){
        return axios({
            method: "DELETE",
            url: `https://6111167dc38a0900171f0fda.mockapi.io/Food/${id}`,
        })
    }

    getFoodByID(id){
        return axios({
            method: "GET",
            url: `https://6111167dc38a0900171f0fda.mockapi.io/Food/${id}`
        })
    }

    updateFoodAPI(food){
        return axios({
            method: "PUT",
            url: `https://6111167dc38a0900171f0fda.mockapi.io/Food/${food.id}`,
            data: food
        })
    }
}