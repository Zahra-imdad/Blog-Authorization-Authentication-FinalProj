class Blog{
    constructor(){
        this.titleTextArea = document.getElementById("titleAdd")
        this.contentTextArea = document.getElementById("contentAdd")
        this.blogCard = document.getElementById("blogCard");
        this.addBlogBtn = document.getElementById("addBlogBtn")
        this.ShowBlogs()
        
    }
    ShowBlogs(){
        fetch('http://localhost:3000/blog/get_all_blogs')
        .then((res)=>res.json())
        .then((data) => {
            data.blogPosts.forEach((blog) =>
              this.createBlogCard(blog.title, blog.content,blog.postedAt,blog._id ,blog.authorDetail.username),
              console.log(data.blogPosts)
            );
    })
    }

    createBlogCard(title, content,postedAt ,id,authorDetail){
        globalThis.div = document.createElement("div");
        div.setAttribute("data-id", `${id}`);
   
    div.className = "col-lg-4";
    div.innerHTML = `<div class="card m-2">
    <div class="card-body d-flex flex-column align-items-center ">
      <h4 class="card-title text-uppercase py-2">${title}</h4>
      <p class="card-text text-capitalize">${content}</p>
      <button type="button" class="btn btn-background text-white btn-sm p-2 mb-3">Read More</button>
      <p class="card-text">Blog By :<small class="text-danger text-capitalize"> ${authorDetail}</small></p>
      <p class="card-text"><small class="text-success ">${postedAt}</small></p>
      </div>
    </div>`;
    blogCard.append(div);
    }
  }

const blog = new Blog();