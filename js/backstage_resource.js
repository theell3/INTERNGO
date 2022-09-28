

//目標：從資料庫取得導師資訊
Vue.component('teacher-data',{
    data(){
        return{
            teacherData:[],
        }       
    },
    methods: {
        
    },
    mounted() {
        //顯示履歷導師的資料
        fetch(`./php/resumeReview.php`)
        .then(rsp => rsp.json())
        .then(userArr => {    
            this.teacherData = userArr
            // console.log(this.teacherData) //確認有回傳資料
        })
    },
    updated() {
        // swiper套件---------------------
        var swiper = new Swiper(".mySwiper", {
            
            slidesPerView: 5,     //同時顯示的slides數量。auto則依 slide 大小來顯示
            spaceBetween: 30,     //slide的間距
            // autoplay: true,     //自動撥放
            // slideToClickedSlide: true,     //true時，則點擊slide會跑到這個slide。
            // centeredSlides: true,     //設定為true時，active slide會居中，而不是預設值的靠左。
            loop:true,     //設置 active slide 居中後，會有左右留白現象，添加此會讓未尾的導航補齊前後空白
            
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,

            // pagination: { //小圓點
            //   el: ".swiper-pagination",
            //   clickable: true,
            // },

            navigation: { //箭頭
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });
    },
    template:`
        <div class="swiper mySwiper">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="teachers in teacherData">
                    <a><img :src="teachers.img" alt="導師照片"></a>
                    <ul class="teacherInform">
                        <li><h3 class="tname">{{teachers.tname}}</h3></li>
                        <li><h4 class="major">{{teachers.tjobtitle}}</h4></li>
                        <li><h4 class="match">已健診人數：{{teachers.ttimes}}</h4></li>
                        <a href="#"><button class="btna21">詳細資料</button></a>
                    </ul>
                </div>
            </div>
            <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>
            <div class="swiper-pagination"></div>
        </div>
    `,
})

Vue.component('')
let vm = new Vue({
    el: `#backstage_resource_teacher_app`,
    data:{        
        toggleAddTeacher:false, //打開彈窗。新增導師
        figure:'',

    },
    methods:{
        addTeacher(){
            this.toggleAddTeacher = !this.toggleAddTeacher
        },
        changeFigure(e){
            const file = e.target.files.item(0); 
            const reader = new FileReader();
            reader.addEventListener('load', this.imageLoaded);
            reader.readAsDataURL(file);              
        },
        imageLoaded(e) {
            this.figure = e.target.result; 
          },
    },
    template:`
    <div>
        <ul class="block" >
            <!-- 新增導師彈窗-->
            <div class="backstage_addTeacher" v-if="toggleAddTeacher">
                <div class="contactUSInner"></div>
                <div class="card3">
                    <ul class="cardUl">
                        <li>
                            <h1 class="cardH1">新增導師</h1>
                        </li>
                        <li>
                            <i class="fa-solid fa-xmark cardXmark" @click="addTeacher"></i>
                        </li>
                    </ul>
                    <div class="cardInner applyfor">
                        <section class="input01">
                            <h2 class="question">導師名稱</h2>
                            <input class="inputText" type="text" placeholder="請輸入導師姓名">
                        </section>

                        <section class="input01">
                            <h2 class="question">導師照片</h2>
                            <div class="teacherPhoto">
                                <input type="file" @change="changeFigure">
                                <img v-if="figure" :src="figure" alt="導師照片">
                            </div>
                        </section>

                        <section class="input01">
                            <h2 class="question">導師資料</h2>
                            <input  class="inputText school" type="text" placeholder="請輸入最高學歷">
                            <input  class="inputText industry" type="text" placeholder="請輸入擅長產業">
                            <textarea class="skill" placeholder="請輸入擅長職務"></textarea>
                            <textarea class="tdescription" placeholder="導師簡介"></textarea>
                        </section>

                        <!-- 按鈕：儲存、取消 -->
                        <ul class="edit">
                            <li class="btna3" @click="addTeacher">取消</li>
                            <li class="btna4" @click="addTeacher">儲存</li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- 真人履歷健檢導師群 -->
            <li>
                <h3>履歷健檢導師群</h3>
            </li>

            <li>
                <ul class="addTeacher">                    
                    <li @click="addTeacher"><h4>新增導師</h4></li>
                    <li><i class="fa-solid fa-arrow-up-from-bracket" @click="addTeacher"></i></li>
                </ul>
                <div class="inputsearch">
                    <i class="fa-solid fa-magnifying-glass"></i>
                    <input type="Text" class="inputText" placeholder="搜尋導師名稱" name="search">
                </div>
            </li>       
        </ul>
        <div class="containTeacher swiper-container mySwiper" >
            <teacher-data></teacher-data>
        </div>      
    </div> 
    `
})

let vms = new Vue({
    el:'#backstage_resource_article_app',
    data:{
        toggleAddArticle:false, //打開彈窗。新增文章
    },
    methods:{
        addArticle(){ //開關新增文章
            this.toggleAddArticle = !this.toggleAddArticle
        },        
    },
    updated(){
        
    },
    template:`
    <div class="block block2">        
        <!-- 新增文章彈窗-->
        <div class="backstage_addArticle" v-if="toggleAddArticle">
            <div class="contactUSInner"></div>
            <div class="card3">
                <ul class="cardUl">
                    <li>
                        <h1 class="cardH1">新增文章</h1>
                    </li>
                    <li>
                        <i class="fa-solid fa-xmark cardXmark" @click="addArticle"></i>
                    </li>
                </ul>
                <div class="cardInner applyfor">
                    <section class="input01">
                        <h2 class="question">文章標題</h2>
                        <input class="inputText" type="text" placeholder="請輸入文章標題">
                    </section>

                    <section>
                        <h2 class="question">文章內容</h2>
                        <textarea name="" id="" cols="30" rows="6" placeholder="請輸入文章內容"></textarea>
                    </section>

                    <!-- 按鈕：儲存、取消 -->
                    <ul class="edit">
                        <li class="btna3" @click="addArticle">取消</li>
                        <li class="btna4" @click="addArticle">儲存</li>
                    </ul>
                </div>
            </div>
        </div> 
        <li class="articleTitle">
            <h3>文章種類：</h3>
            <div class="consultantIndustrySearch">
                <button class="btna21">求職指南<i class="fa-solid fa-chevron-down"></i></button>
                <ul class="consultantIndustry searchItem">
                    <li><button class="btna22">求職指南</button></li>
                    <li><button class="btna22">履歷教學</button></li>
                    <li><button class="btna22">面試技巧</button></li>
                    <li><button class="btna22">職涯發展</button></li>
                </ul>                    
            </div>
        </li>

        <li class="articleTitle">
            <ul class="addContent">
                <li><a><h4 @click="addArticle">新增文章</h4></a></li>
                <li><i @click="addArticle" class="fa-solid fa-arrow-up-from-bracket"></i></li>
            </ul>
            <div class="inputsearch">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input type="Text" class="inputText" placeholder="搜尋文章名稱" name="search">
            </div>
        </li>           
        </ul>    
    </div>
    `
})

//打開/關閉子選單
let consultantIndustrySearch = document.querySelector(".consultantIndustrySearch");  
let categoryCurrent = consultantIndustrySearch.firstElementChild;
let consultantIndustry = document.querySelector(".searchItem"); 
let category = consultantIndustry.querySelectorAll("button"); //找到所有子選單選項
// console.log(category);
// console.log(categoryCurrent.innerText);
let currentCategory = consultantIndustrySearch.firstElementChild;
consultantIndustrySearch.addEventListener("click", () => {
    consultantIndustry.classList.toggle("-on");
    if(consultantIndustry.classList.contains("-on")){
        consultantIndustry.style.display = "block";
    }else{
        consultantIndustry.style.display = "none";
    }

    for(let i = 0; i <category.length; i++ ){
        category[i].addEventListener("click", e => {
            
            categoryCurrent.innerText = e.target.innerHTML;
            categoryCurrent.insertAdjacentHTML("beforeend", `
                <i class="fa-solid fa-chevron-down"></i>
            `)
        })
    }
})