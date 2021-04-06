var app = new Vue (
    {
        el: "#root",
        data:{
        contacts: [
        {
            name: 'Michele',
            avatar: 'img/avatar_1.jpg',
            visible: true,
            messages: [
                {
                    date: '10/01/2020 15:30:55',
                    text: 'Hai portato a spasso il cane?',
                    status: 'sent'
                },
                {
                    date: '10/01/2020 15:50:00',
                    text: 'Ricordati di dargli da mangiare',
                    status: 'sent'
                },
                {
                    date: '10/01/2020 16:15:22',
                    text: 'Tutto fatto!',
                    status: 'received'
                }
            ]
        },
        {
            name: 'Fabio',
            avatar: 'img/avatar_2.jpg',
            visible: true,
            messages: [
                {
                    date: '20/03/2020 16:30:00',
                    text: 'Ciao come stai?',
                    status: 'sent'
                },
                {
                    date: '20/03/2020 16:30:55',
                    text: 'Bene grazie! Stasera ci vediamo?',
                    status: 'received'
                },
                {
                    date: '20/03/2020 16:35:00',
                    text: 'Mi piacerebbe ma devo andare a fare la spesa.',
                    status: 'sent'
                }
            ],
        },
        {
            name: 'Samuele',
            avatar: 'img/avatar_3.jpg',
            visible: true,
            messages:[
                {
                    date: '28/03/2020 10:10:40',
                    text: 'La Marianna va in campagna',
                    status: 'received'
                },
                {
                    date: '28/03/2020 10:20:10',
                    text: 'Sicuro di non aver sbagliato chat?',
                    status: 'sent'
                },
                {
                    date: '28/03/2020 16:15:22',
                    text: 'Ah scusa!',
                    status: 'received'
                }
            ],
        },
        {
            name: 'Luisa',
            avatar: 'img/avatar_4.jpg',
            visible: true,
            messages:[
                {
                    date: '10/01/2020 15:30:55',
                    text: 'Lo sai che ha aperto una nuova pizzeria?',
                    status: 'sent'
                },
                {
                    date: '10/01/2020 15:50:00',
                    text: 'Si, ma preferirei andare al cinema',
                    status: 'received'
                }
            ],
        },
        ],

        emoji: ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "🥰", "😗", "😋", "😝", "😜", "🤨",
        "🤩", "🥳", "🤬", "😱", "🤔", "🤫", "😬", "😮", "😴", "🤑", "😈", "💩", "👋", "👌", "🤟", "👊", "💪", "👏", "🐶", "🐱", "🐽", "🙉", "🐔", "🍕",
        "🍻", "🌈", "☀️", "🍎", "🌶", "🍭", "❤️", ],

        elementIndex: 0,
        newText: "",
        searched: "",
        stringaControllo:[],
        newName: "",
        newPic: "",
        addClass: " "
    },
    
    methods: {

        instantSearch:function(){
            let searchedMin = this.searched;
            this.searched = this.searched.charAt(0).toUpperCase() + this.searched.slice(1);
            searchedMin = searchedMin.charAt(0).toLowerCase() + searchedMin.slice(1)

            this.contacts.forEach((element, index) => {
                
                if( element.name.includes(this.searched) || element.name.includes(searchedMin)){
                    element.visible = true;
                }
                else { 
                    element.visible = false;
                }

            } );
        },

        selectContact: function(i){
            this.elementIndex = i;
        },

        sendMsg: function(){
            
            this.contacts[this.elementIndex].messages.push(
                {   
                    date: dayjs().format('DD/MM/YY HH.mm.ss'),
                    text: this.newText,
                    status: "sent"
                }
            );
            this.newText = "";
            setTimeout(() => {
                this.contacts[this.elementIndex].messages.push(
                    {
                        date: dayjs().format('DD/MM/YY HH.mm.ss'),
                        text: "ok",
                        status: "received"
                    }
                );
            }, 1000);

        },
        searchContact: function(){
            this.searched = this.searched.charAt(0).toUpperCase() + this.searched.slice(1);
            this.contacts.forEach((element, index) => {
                this.stringaControllo.push(element.name);
            } );
            if(this.stringaControllo.includes(this.searched)){
                this.elementIndex = this.stringaControllo.indexOf(this.searched);
                this.searched = "";
            }
            else{
                alert(this.searched + " non rientra nella tua lista contatti");
                this.newName = this.searched;
                this.addClass = "open"
                this.searched = "";
            }
        },

        insEmoji: function(i){
            this.newText += this.emoji[i];
        },

        addContact: function(){

            if ( this.newName != "" ){
                this.newName = this.newName.charAt(0).toUpperCase() + this.newName.slice(1);
                this.contacts.push(
                    {
                        name: this.newName,
                        avatar: "img/"+this.newPic,
                        visible: true,
                        messages:[],
                    }
                );  
                this.newName = "";
                this.newPic = "";
                this.addClass = " ";
            }
        },

        showSection: function(){
            if(this.addClass == " "){
                this.addClass = "open";
            }
            else if(this.addClass == "open"){
                this.addClass = " ";
                this.newName = "";
                this.newPic = "";
            }
        }
    }

})
