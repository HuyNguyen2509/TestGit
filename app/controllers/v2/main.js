import ListFood from "./../../models/v2/ListFood.js";
import Food from "./../../models/v2/Food.js";

const getEL =(id) => document.getElementById(id);

const listFood = new ListFood();

const renderHTML =(arr) =>{
    let html='';
    arr.forEach((item) => {
        html += `
            <tr>
                <td>${item.id}</td>
                <td>${item.tenMon}</td>
                <td><img src="./../../../assets/img/${item.hinhMon}"/></td>
                <td>${item.loaiMon ==="loai1" ? "Chay":"Mặn"}</td>
                <td>${item.giaMon}</td>
                <td>${item.khuyenMai}</td>
                <td>${item.giaKhuyenMai}</td>
                <td>${item.tinhTrang === "0"?"Hết":"Còn"}</td>
                <td>
                    <button class="btn btn-primary" data-toggle="modal"
              data-target="#exampleModal" onclick="selectFood(${item.id})">Chọn</button>
                    <button class="btn btn-danger" onclick="deleteFood(${item.id})">Xóa</button>
                </td>
            </tr>
        `
    });
    getEL('tbodyFood').innerHTML=html;
}

const fetchData =() =>{
    listFood.getListFoodAPI().then((result)=>{
        renderHTML(result.data);
    })
    .catch((er)=>{
        console.log(er);
    })
}


/* Thêm */
getEL('btnThem').addEventListener('click', ()=>{
    document.getElementsByClassName('modal-title')[0].innerHTML="Thêm Món Ăn NÈ";
    const footer=`
        <button class="btn btn-success" onclick="addFood()">Thêm</button>
    `
    document.getElementsByClassName('modal-footer')[0].innerHTML=footer;
})
const addFood=()=>{
    const _tenMon=getEL('tenMon').value;
    const _loaiMon=getEL('loai').value;
    const _giaMon=getEL('giaMon').value;
    const _khuyenMai=getEL('khuyenMai').value;
    const _tinhTrang=getEL('tinhTrang').value;
    
    let _hinhMon = '';
    if(getEL('hinhMon').files.length > 0){
        _hinhMon = getEL('hinhMon').files[0].name;
    }

    const _moTa = getEL('moTa').value;

    const food = new Food(
        "",
        _tenMon,
        _loaiMon,
        _giaMon,
        _khuyenMai,
        _tinhTrang,
        _hinhMon,
        _moTa
    );
    food.tinhGiaKhuyeMai();

    listFood.addFoodAPI(food).then(()=>{
        alert("Thêm Món Ăn Hoàn Tất")
        fetchData();
        document.getElementsByClassName('close')[0].click();
    })
    .catch((er)=>{
        console.log(er);
    })
}
window.addFood=addFood;


/* Xóa */
const deleteFood=(id)=>{
    listFood.deleteFoodAPI(id).then(()=>{
        alert("Xóa Món Hoàn Tất")
        fetchData();
    })
    .catch((er)=>{
        console.log(er);
    })
}
window.deleteFood=deleteFood;

/* Chọn Món */
const selectFood=(id)=>{
    document.getElementsByClassName('modal-title')[0].innerHTML="Cập Nhật Món"
    const footer=`
        <button class="btn btn-success" onclick="updateFood(${id})">Update Footer</button>
    `
    document.getElementsByClassName('modal-footer')[0].innerHTML=footer;

    listFood.getFoodByID(id).then((result)=>{
        getEL('foodID').value = result.data.id;
        getEL('tenMon').value = result.data.tenMon;
        getEL('loai').value = result.data.loaiMon;
        getEL('giaMon').value = result.data.giaMon;
        getEL('khuyenMai').value = result.data.khuyenMai;
        getEL('tinhTrang').value = result.data.tinhTrang;
        getEL('moTa').value = result.data.moTa;
    })
    .catch((er)=>{
        console.log(er);
    })

}
window.selectFood=selectFood;

const updateFood= async (id)=>{
    const _tenMon=getEL('tenMon').value;
    const _loaiMon=getEL('loai').value;
    const _giaMon=getEL('giaMon').value;
    const _khuyenMai=getEL('khuyenMai').value;
    const _tinhTrang=getEL('tinhTrang').value;
    
    let _hinhMon = '';
    if(getEL('hinhMon').files.length > 0){
        _hinhMon = getEL('hinhMon').files[0].name;
    }

    const _moTa = getEL('moTa').value;

    const food = new Food(
        id,
        _tenMon,
        _loaiMon,
        _giaMon,
        _khuyenMai,
        _tinhTrang,
        _hinhMon,
        _moTa
    );
    food.tinhGiaKhuyeMai();
    
    const foodDetail = await listFood.getFoodByID(id);
    if(!food.hinhMon){
        food.hinhMon=foodDetail.data.hinhMon;
    }

    listFood.updateFoodAPI(food).then(()=>{
        alert("Update Food Success")
        fetchData();
        document.getElementsByClassName('close')[0].click();
    })
    .catch((er)=>{
        console.log(er);
    })

}
window.updateFood=updateFood;

getEL('selLoai').addEventListener('change', ()=>{
    const type = getEL('selLoai').value;

    let mangTimKiem =[];

    listFood.getListFoodAPI().then((result)=>{
        if(type === "all"){
            mangTimKiem= result.data;
        }else{
            mangTimKiem=result.data.filter((item)=>{
                return type===item.loaiMon;
            })
        }
        renderHTML(mangTimKiem);
    })
})