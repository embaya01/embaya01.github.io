let github = {
    "user": "embaya01",
    "token": "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",
    getRepos: function () {
        
        fetch("https://api.github.com/users/embaya01/repos",
        {method:"GET"}).then((response)=> response.json())
        .then((data)=>this.displayRepos(data));
      },
    displayRepos: function (data) {
        let portfolio = document.querySelector(".portfolio-container");
        let count = 0;
        for (const key in data) {
            const repo = data[key];
            const { login } = repo.owner;
            const { name, html_url, description, topics, homepage } = repo;
            let portfolioItem = document.createElement("div");
            if (topics.includes("website")) {
                portfolioItem.setAttribute("class","col-lg-4 col-md-6 portfolio-item filter-web");
            }else if(topics.includes("mobile")){
                portfolioItem.setAttribute("class","col-lg-4 col-md-6 portfolio-item filter-app");
            }
            else{
                portfolioItem.setAttribute("class","col-lg-4 col-md-6 portfolio-item filter-card");
            }
            let portfolioWrap = document.createElement("div");
            portfolioWrap.setAttribute("class","portfolio-wrap");
            let portfolioImg = document.createElement("img");
            portfolioImg.setAttribute("class","img-fluid");
            portfolioImg.src = "assets/img/projects/"+name+".png";
            let portfolioInfo = document.createElement("div");
            portfolioInfo.setAttribute("class","portfolio-info");
            let portfolioTitle = document.createElement("h4");
            let portfolioTitleLink = document.createElement("a");
            if (homepage != null){
                portfolioTitleLink.setAttribute("href",homepage);
                portfolioTitleLink.setAttribute("target","_Blank");
                portfolioTitleLink.innerText = name;
            }else{
                portfolioTitle.innerText = name
                }
            let portfolioDesc = document.createElement("p");
            if (description != null) 
                portfolioDesc.innerText = description.substring(0, 35) +"...";
            let portfolioLinks = document.createElement("div");
            portfolioLinks.setAttribute("class","portfolio-links");
            let portfolioLightbox = document.createElement("a");
            portfolioLightbox.setAttribute("href",html_url);
            portfolioLightbox.setAttribute("data-gallery","portfolioGallery");
            portfolioLightbox.setAttribute("target","_Blank");
            portfolioLightbox.setAttribute("class","portfolio-lightbox");
            portfolioLightbox.setAttribute("title",name);
            let portfolioPlusIcon = document.createElement("i");
            portfolioPlusIcon.setAttribute("class","bx bx-plus");
            let portfolioDetails = document.createElement("a");
            portfolioDetails.setAttribute("href","portfolio-details.html");
            portfolioDetails.setAttribute("data-gallery","portfolioDetailsGallery");
            portfolioDetails.setAttribute("data-glightbox","type: external");
            portfolioDetails.setAttribute("class","portfolio-details-lightbox");
            portfolioDetails.setAttribute("title","Portfolio Details");
            let portfolioLinkIcon = document.createElement("i");
            portfolioLinkIcon.setAttribute("class","bx bx-link");

            portfolio.append(portfolioItem);
            portfolioItem.append(portfolioWrap);
            portfolioWrap.append(portfolioImg,portfolioInfo);
            portfolioInfo.append(portfolioTitle,portfolioDesc,portfolioLinks);
            if (homepage != null)
                portfolioTitle.append(portfolioTitleLink);
            portfolioLinks.append(portfolioLightbox,portfolioDetails);
            portfolioLightbox.append(portfolioPlusIcon);
            portfolioDetails.append(portfolioLinkIcon);
            console.log(name+" " +login + " " + count);

            count++;
        }
      }
}
github.getRepos();