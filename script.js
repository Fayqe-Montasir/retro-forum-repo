const loadAllPosts = async(category) =>{

    // console.log(`https://openapi.programming-hero.com/api/retro-forum/posts${category? `?category=${category}` : '' }`)

    // if(category){
        
    //     console.log(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${category}`)
    // }
    // else{
    //     console.log('https://openapi.programming-hero.com/api/retro-forum/posts')
    // }

    document.getElementById('post-container').innerHTML = ''
    const response = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts${category?`?category=${category}`:'' }`)
    const data = await response.json();
    displayAllPost(data.posts)
}

const displayAllPost = (posts) =>{
    const postContainer =document.getElementById('post-container')
    posts.forEach( post =>{
        const div = document.createElement('div')
        div.innerHTML =`
        <div
        class="p-6 lg:p-12 flex gap-6 lg:flex-row flex-col items-center lg:items-start bg-[#F3F3F5] rounded-3xl"
    >
    <div class="indicator">
        <span class="indicator-item badge ${post.isActive ? "bg-green-600" : "bg-red-500"}"></span>
        <div class="avatar">
            <div class="w-24 rounded-xl">
            <img
                src=${post.image}
            />
            </div>
        </div>
        </div>
        <div class="space-y-4 w-full">
          <div class="flex gap-4 *:opacity-60">
            <p># ${post.category}</p>
            <p>Author: ${post.author.name}</p>
        </div>
        <h3 class="text-2xl font-bold opacity-70">
            ${post.title}
        </h3>
        <p class="opacity-40">
        ${post.description}
        </p>
        <hr class="border border-dashed border-gray-300" />
        <div
            class="flex justify-between *:font-bold [&>*:not(:last-child)]:opacity-45"
        >
            <div class="flex gap-4">
            <div class="space-x-2 flex items-center">
                <i class="fa-regular fa-comment-dots"></i>
                <p>${post.comment_count}</p>
            </div>
            <div class="space-x-2 flex items-center">
                <i class="fa-regular fa-eye"></i>
                <p>${post.view_count}</p>
            </div>
            <div class="space-x-2 flex items-center">
                <i class="fa-regular fa-clock"></i>
                <p>${post.posted_time} Min</p>
            </div>
            </div>
            <div class="opacity-100">
            <button id="addToList" onclick="markAsRead('${post.description}', '${post.view_count}' )"  class="addToList btn btn-circle bg-green-500 btn-sm">
                <i class="fa-solid fa-envelope-open text-white"></i>
            </button>
            </div>
        </div>
        </div>
    </div>
        `
        postContainer.appendChild(div)
    })
}

const markAsRead = (description, view_count) =>{
const markAsReadContainer = document.getElementById('markAsReadContainer');
const div = document.createElement('div')
div.innerHTML =`
<div class="flex justify-between p-2 lg:p-3 bg-white rounded-2xl items-center gap-3">
  <div class="lg:w-4/5 w-11/12">
    <p>${description}</p>
  </div>
  <div class="lg:w-1/5 w-4/12 flex justify-end">
    <p><i class="fa-regular fa-eye "></i>${view_count} </p>
  </div>
</div>
`
markAsReadContainer.appendChild(div)
handlecount()
}
const handlecount =() =>{
    const prevcount = document.getElementById('markAsReadCounter').innerText;
    const conver =parseInt(prevcount);
    const sum = conver + 1;
    document.getElementById('markAsReadCounter').innerText = sum
}


loadAllPosts()

const handleSearchCategory = () =>{
    const searchText = document.getElementById('searchPosts').value;
    loadAllPosts(searchText)

}
const latest = async() =>{
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts')
    const datas = await res.json();
    console.log(datas)
    datas.forEach(data =>{
        const latestPost  =document.getElementById('latest-post-container')
        console.log(data)
        const div =document.createElement('div')
        div.innerHTML = `
        <div class="card lg:w-96 pb-5 bg-base-100 shadow-2xl">
          <figure class="lg:px-6 px-4 pt-4 lg:pt-8">
              <img
                  src=${data.cover_image}
                  alt="Shoes"
                  class="rounded-xl"
              />
          </figure>
          <div class="p-5 lg:p-10 space-y-4 lg:space-y-5">
              <p class="opacity-50 text-start">
                  <i class="fa-solid fa-calendar-days me-2"></i>${data.author.posted_date || 'No Publish Date'}


                 
              </p>
              <h2 class="card-title text-start">${data.title}</h2>
              <p class="text-start">
                  ${data.description}
              </p>
              <div class="card-actions flex gap-5 items-center">
                  <div class="avatar">
                      <div
                          class="lg:w-12 w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
                      >
                          <img
                          src=${data.profile_image}
                          />
                      </div>
                  </div>
              <div>
              <h3 class="text-start font-extrabold"> ${data.author.name}</h3>
              <p class="text-start opacity-60">${data.author?.designation || "Unknown" }</p>
          </div>
      </div>
        

          <span
            id="latestPostLoader"
            class="loading loading-infinity loading-lg lg:mt-24 text-primary hidden"
          >
        

          
        
        
        </span>
          <!-- dynamic content -->
        </div>
        `
        latestPost.appendChild(div)
    } )
    
}
latest()