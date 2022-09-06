


class EditBlog{
    constructor(){
        this.updateBtn = document.getElementById("EditBlogBtn")
        this.titleTextArea = document.getElementById("titleAdd")
        this.contentTextArea = document.getElementById("contentAdd")
        this.showUserBlogs()
    }
    //========================================================
    //================FETCH BLOGS=============================
    //========================================================
    showUserBlogs(){
        const userId = localStorage.getItem('uid')
        console.log("USER ID: ",userId);
        fetch(`http://localhost:3000/blog/current_user_blogs/${userId}`)
        .then((res)=>res.json())
        .then((data) => {
            data.blogPosts.forEach((blog) =>
              this.createBlogCard(blog.title, blog.content,blog.postedAt,blog._id,blog.authorDetail.username ),
              console.log(data.blogPosts)
            );
    })
    }

    //========================================================
    //================CREATE BLOG STRUCTURE===================
    //========================================================
    createBlogCard(title, content,postedAt ,id,authorDetail){
        
        globalThis.div = document.createElement("div");
        div.setAttribute("data-id", `${id}`);
   
    div.className = "card ";
    div.innerHTML = `<div class="card-body d-flex flex-column align-items-center ">
      <h4 class="card-title text-uppercase p-2">${title}</h4>
      <p class="card-text text-capitalize">${content}</p>
      
      <p class="card-text"><small class="text-success">${postedAt}</small></p>
      <p class="card-text">Blog By :<small class="text-danger"> ${authorDetail}</small></p>
      <button type="button" class="btn btn-background text-white btn-sm p-2">Read More</button>
      <div class="p-2">
        <i class="bi bi-pencil-square text-primary m-1"></i>
        <i class="bi bi-trash text-danger"></i>
      </div>
    </div>`;
    blogCard.append(div);

    this.edit = div.querySelector("div > i:first-child");
    this.trash = div.querySelector("div > i:last-child");
    // this.editTitle = div.querySelector(".edit-input>input");
    // this.editContent = div.querySelector(".edit-input>textarea");
    this.h5 = div.querySelector("h4.card-title")
    this.p = div.querySelector("p.card-text")
    this.removeBlog(this.trash,div)
    this.updateEdit(this.edit,div)
    this.EditBlogClick(this.updateBtn,div)
    }

    //========================================================
    //======================DELETE ONE BLOG===================
    //========================================================
    removeBlog(trash, element) {
        trash.addEventListener("click", () => {
          console.log("Console: ", element.dataset.id);
          
          fetch(`http://localhost:3000/blog/delete_blog/${element.dataset.id}`, {
            method: "DELETE",
          });
          element.remove();
        });
      }

    //========================================================
    //======================UPDATE BLOG=======================
    //========================================================
    updateEdit(edit,div) {
        edit.addEventListener("click", (e) => {
            // let ids = div.getAttribute("data-id");
            // console.log("BLOG IDs: ", ids)
            globalThis.updateBlogID = div.dataset.id
           console.log("BLOG ID: ", div.dataset.id)
           console.log(`titleTextArea.input.value = hello`)
          console.log("edit Clicked")
          this.titleTextArea.value = this.h5.innerText
          this.contentTextArea.value = this.p.innerText
        });
      }

    EditBlogClick(update,element){
        update.addEventListener("click",(e)=>{
            console.log("Updated Blog Id: ",updateBlogID);
            const typedEditTitle = this.titleTextArea.value.trim();
            const typedEditContent = this.contentTextArea.value.trim();
            console.log(this.titleTextArea.value.trim())
            fetch(`http://localhost:3000/blog/update_blog/${updateBlogID}`, {
            method: "PUT",
            body: JSON.stringify({
            title: typedEditTitle,
            content: typedEditContent,
          }),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        });
        })
    }
   
    
}

const editBlog = new EditBlog();