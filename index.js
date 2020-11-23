
const URL = "https://randomuser.me/api";

class RandomUser extends HTMLElement {
    constructor(){
        super();
    }

    async connectedCallback() {
        const user = await this.user;
        this.render(user);
    }

    get user() {
        return fetch(URL).then(response => {
            return response.json().then(data => {
                return data.results[0];
            });
        });
    }

    get styles() {
        return `
            .container {
                display: flex;
            }
            img {
                display: block;
                width: 128px;
                height: 128px;
            }
            h1 {
                margin: 0;
            }
            .data {
                display: flex;
                flex-direction: column;
                padding-left: 10px;
            }
            .email {
                color: purple;
            }
        `;
    }

    render(user){
        this.innerHTML = `
            <style>${this.styles}</style>
            <div class="container">
                <img src="${user?.picture?.large}">
                <div class="data">
                    <h1>${user?.name?.first} ${user?.name?.last}</h1>
                    <span class="email">${user?.email}</span>
                    <span class="age">${user?.dob?.age}</span>
                    <span class="location">${user?.location?.city}</span>
                    <span class="password">${user?.login?.password}</span>
                </div>
            </div>
        `;
    }
}

customElements.define("random-user", RandomUser);