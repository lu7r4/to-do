Vue.createApp({
        data() {
            return {
                valueInput: '',
                needDoList: [],
                completeList: [],
                name: ''            };
        },
        mounted() {
            if (localStorage.name) {
                this.name = localStorage.name;
            }
            if (localStorage.getItem('completeList')) {
                this.completeList = JSON.parse(localStorage.getItem('completeList'));
            }
            if (localStorage.getItem('needDoList')) {
                    this.needDoList = JSON.parse(localStorage.getItem('needDoList'));
                }
            },
        watch: {
            name(newName) {
                localStorage.name = newName;
            }
        },
        methods: {
            handleInput (event) {
                this.valueInput = event.target.value;

            },
            addTask () {
                if(this.valueInput === '') { return };
                this.needDoList.push({
                    title: this.valueInput,
                    id: Math.random()
                });
                this.valueInput = '';
            },
            
            doCheck (index, type) {
                if(type === 'need') {
                    const completeMask = this.needDoList.splice(index, 1);
                    this.completeList.push(...completeMask);
                }
                else {
                    const noCompleteMask = this.completeList.splice(index, 1);
                    this.needDoList.push(...noCompleteMask);
                }
            },
           
            removeMask (index, type) {
                const toDoList = type === 'need' ? this.needDoList : this.completeList;
                toDoList.splice(index,1);
            },
            reName () {
                localStorage.clear();
                location.reload();
            },
                saveAll () {
                    const parsedComplete = JSON.stringify(this.completeList);
                    localStorage.setItem('completeList', parsedComplete);
                    const parsedNeed = JSON.stringify(this.needDoList);
                    localStorage.setItem('needDoList', parsedNeed);
                    
                }
        }
    }
    ).mount('#app');