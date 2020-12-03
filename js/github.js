function htmlToElem(html) {
    let temp = document.createElement('template');
    html = html.trim();
    temp.innerHTML = html;
    return temp.content.firstChild;
}

var request = new XMLHttpRequest()
request.open('GET', 'https://api.github.com/users/MM-coder/repos?per_page=100', true)

request.onload = function () {
    var data = JSON.parse(this.response)
    data.forEach(i => {
        if (((Math.ceil((Date.now() - Date.parse(i['updated_at'])) / (1000 * 60 * 60 * 24))) <= 7 || (i['stargazers_count'] >= 0 && i['fork'] == false)) && i['description'] != null &&  i['fork'] == false) {

            function getName() {
                var name = i['name']
                var l = []
                name.split('-').forEach(i => {
                    l.push(i.charAt(0).toUpperCase() + i.slice(1))
                })
                return l.join(' ');
            }

            var html = `<div data-uk-scrollspy-class="uk-animation-slide-left-medium">
                            <div class="uk-card uk-card-body">
                                <h3 class="uk-card-title">${getName()}</h3>
                                <small><code>${i['full_name']}</code></small>
                                <p>${i['description']}</p>
                                <div class="uk-grid-small stats-grid" uk-grid>
                                    <div>
                                        <div class="stat">
                                            <span uk-icon="icon: star"></span><span>${i['stargazers_count']}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="stat">
                                            <span uk-icon="icon: git-fork"></span><span>${i['forks']}</span>
                                        </div>
                                    </div>
                                </div>
                                <a href="${i['html_url']}" class="uk-icon-button uk-margin-small-right" uk-icon="github"></a>
                                ${i['homepage'] ? `<a href="${i['homepage']}" class="uk-icon-button uk-margin-small-right" uk-icon="link"></a>` : ''}
                            </div>
                        </div>`


            var parent = document.getElementById('github-grid')
            parent.appendChild(htmlToElem(html))
        }
    });
}

request.send()
