const render_blogs = async () => {
    let blogs_dir = document.getElementById("blogs_dir");
  
    try {
      let response = await fetch("https://mcts-bn.cyclic.app/blogs")
      response = await response.json();
  
      const Blogs = response.blogs;
  
      const Blog = (blog) => {
        let body = ``
        blog.body.split("\n").slice(0,1).map(item => {
            body += `<p>${item.trim()}</p></br>`
        })
        return `
        <div class="content">
        <img src="${blog.image}" alt="" />
        <h3>${format_date(blog.updatedAt)}</h3>
        <h2>${blog.title}</h2>
        <div>
          ${body}
        </div>
        <a href="#" id="${blog._id}" onclick="togglePopup('${blog._id}')">Read more</a>
      </div>
        `
      }
  
      Blogs.map((item) => {
        blogs_dir.innerHTML += Blog(item)
      })
  
    } catch(error) {
      console.error(error)
    }
  }
  
  render_blogs();

const render_a_blog = async (id) => {
  try {
    let response = await fetch(`https://mcts-bn.cyclic.app/blogs/${id}`)
    response = await response.json();

    const blog = response.blog;
    console.log(blog, "here")

    let body = ``
    blog.body.split("\n").map(item => {
        body += `<p>${item.trim()}</p></br>`
    })
    const template =
    `
    <h2 class="blog_title">${blog.title}</h2>
    <div class="close-btn" onclick="togglePopup()">&times;</div>
    <img src="${blog.image}" class="blog_image" alt="" />
    <h3 class="blog_title blog_date">${format_date(blog.updatedAt)}</h3>
    ${body}
    `
    const popup = document.querySelector("#popup > .content")
    popup.innerHTML = template

  } catch(error) {

  }

}

function togglePopup(id){
  render_a_blog(id)
  document.getElementById('popup').classList.toggle('active');
}


const format_date = (date) => {
  const months = {
    "01": { full: "January", abbr: "Jan" },
    "02": { full: "February", abbr: "Feb" },
    "03": { full: "March", abbr: "Mar" },
    "04": { full: "April", abbr: "Apr" },
    "05": { full: "May", abbr: "May" },
    "06": { full: "June", abbr: "Jun" },
    "07": { full: "July", abbr: "Jul" },
    "08": { full: "August", abbr: "Aug" },
    "09": { full: "September", abbr: "Sep" },
    "10": { full: "October", abbr: "Oct" },
    "11": { full: "November", abbr: "Nov" },
    "12": { full: "December", abbr: "Dec" }
  }

  let bad_formated_date = date.slice(0, 10)
  bad_formated_date = bad_formated_date.split("-")
  console.log(bad_formated_date)

  return `${months[bad_formated_date[1]].abbr}  ${bad_formated_date[2]}, ${bad_formated_date[0]}`
}