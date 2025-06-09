
(function ($) {
    "use strict";
    
    // Smooth scrolling on the navbar links
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            
            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 30
            }, 1500, 'easeInOutExpo');
            
            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }
        }
    });
    

    // Typed Initiate
    if ($('.header h2').length == 1) {
        var typed_strings = $('.header .typed-text').text();
        var typed = new Typed('.header h2', {
            strings: typed_strings.split(', '),
            typeSpeed: 100,
            backSpeed: 20,
            smartBackspace: false,
            loop: true
        });
    }
    
    
    // Skills
    $('.skills').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});
    
    
    // Porfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });

    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('filter-active');
        $(this).addClass('filter-active');

        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });
    
    
    // Review slider
    $('.review-slider').slick({
        autoplay: true,
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });
})(jQuery);

// Portfolio Chatbot
class PortfolioChatbot {
    constructor() {
        this.portfolioData = {
            name: "Ziyanda Tom",
            profession: "AI Associate, Aspiring AI Engineer, Software Developer, Digital Marketing, Hospitality Management",
            projects: [
                {
                    name: "CAPACITI CHATBOT",
                    description: "An interactive chatbot project",
                    link: "https://landbot.online/v3/H-2887235-4OBEO6RDVQYT9AHU/index.html"
                },
                {
                    name: "Job Portal",
                    description: "A job portal website",
                    link: "https://68414cd9009171a8732cf424--deluxe-beijinho-7e5471.netlify.app/"
                }
            ],
            skills: ["AI Development", "Software Development", "Digital Marketing", "Hospitality Management"],
            resume: "/img/resume.pdf.pdf",
            socialLinks: {
                twitter: "#",
                facebook: "#",
                linkedin: "#"
            }
        };
        
        this.responses = {
            greeting: [
                "Hello! I'm Ziyanda's portfolio assistant. How can I help you learn about their work?",
                "Hi there! I can tell you about Ziyanda Tom's projects and experience. What would you like to know?",
                "Welcome! I'm here to help you explore Ziyanda's portfolio. Ask me anything!"
            ],
            name: [
                `My name is ${this.portfolioData.name}.`,
                `I'm ${this.portfolioData.name}, nice to meet you!`
            ],
            profession: [
                `I'm an ${this.portfolioData.profession}.`,
                `My areas of expertise include: ${this.portfolioData.profession}.`
            ],
            projects: [
                "I have several exciting projects in my portfolio. Would you like to hear about my CAPACITI CHATBOT or Job Portal?",
                "My main projects include a CAPACITI CHATBOT and a Job Portal website. Which one interests you?"
            ],
            skills: [
                `My key skills include: ${this.portfolioData.skills.join(", ")}.`,
                `I specialize in ${this.portfolioData.skills.join(", ")}.`
            ],
            resume: [
                "You can download my resume from the portfolio. There's a download button in the main section.",
                "My resume is available for download on the portfolio page."
            ],
            contact: [
                "You can reach me through the contact form on my portfolio or connect with me on social media.",
                "Feel free to contact me on 065 293 9819, my email address is zdddletsoma@gmail.com. For more Check out my linkeIn & Github. I'm always open to new opportunities!"
            ],
            default: [
                "I'm not sure about that. You can ask me about my projects, skills, experience, or how to contact me.",
                "Could you rephrase that? I can help with questions about my portfolio, projects, or background.",
                "I'd be happy to help! Try asking about my projects, skills, or professional background."
            ]
        };
        
        this.initializeChatbot();
    }
    
    initializeChatbot() {
        this.createChatInterface();
        this.bindEvents();
    }
    
    createChatInterface() {
        const chatHTML = `
            <div id="portfolio-chatbot" class="chatbot-container">
                <div class="chatbot-header">
                    <h3>Portfolio Assistant</h3>
                    <button id="chatbot-toggle">💬</button>
                </div>
                <div id="chatbot-messages" class="chatbot-messages"></div>
                <div class="chatbot-input">
                    <input type="text" id="chatbot-input" placeholder="Ask me about Ziyanda's portfolio..." />
                    <button id="chatbot-send">Send</button>
                </div>
            </div>
            
            <style>
                .chatbot-container {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    width: 320px;
                    height: 450px;
                    background: white;
                    border: 2px solid #FF6F61;
                    border-radius: 10px;
                    display: flex;
                    flex-direction: column;
                    z-index: 9999;
                    box-shadow: 0 8px 30px rgba(0,0,0,0.15);
                }
                
                .chatbot-header {
                    background: #FF6F61;
                    color: white;
                    padding: 10px;
                    border-radius: 8px 8px 0 0;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                
                .chatbot-header h3 {
                    margin: 0;
                    font-size: 16px;
                }
                
                #chatbot-toggle {
                    background: none;
                    border: none;
                    color: white;
                    font-size: 18px;
                    cursor: pointer;
                }
                
                .chatbot-messages {
                    flex: 1;
                    padding: 10px;
                    overflow-y: auto;
                    background: #f9f9f9;
                }
                
                .message {
                    margin: 10px 0;
                    padding: 8px 12px;
                    border-radius: 15px;
                    max-width: 80%;
                }
                
                .user-message {
                    background: #FF6F61;
                    color: white;
                    margin-left: auto;
                    text-align: right;
                }
                
                .bot-message {
                    background: white;
                    color: #333;
                    border: 1px solid #ddd;
                }
                
                .chatbot-input {
                    display: flex;
                    padding: 10px;
                    border-top: 1px solid #ddd;
                }
                
                #chatbot-input {
                    flex: 1;
                    padding: 8px;
                    border: 1px solid #ddd;
                    border-radius: 20px;
                    outline: none;
                }
                
                #chatbot-send {
                    margin-left: 10px;
                    padding: 8px 15px;
                    background: #FF6F61;
                    color: white;
                    border: none;
                    border-radius: 20px;
                    cursor: pointer;
                }
                
                #chatbot-send:hover {
                    background: #e55a4f;
                }
                
                .chatbot-minimized {
                    height: 50px;
                }
                
                .chatbot-minimized .chatbot-messages,
                .chatbot-minimized .chatbot-input {
                    display: none;
                }
            </style>
        `;
        
        document.body.insertAdjacentHTML('beforeend', chatHTML);
        
        // Add welcome message
        setTimeout(() => {
            this.addMessage(this.getRandomResponse('greeting'), 'bot');
        }, 1000);
    }
    
    bindEvents() {
        const chatbotInput = document.getElementById('chatbot-input');
        const chatbotSend = document.getElementById('chatbot-send');
        const chatbotToggle = document.getElementById('chatbot-toggle');
        const chatbotContainer = document.getElementById('portfolio-chatbot');
        
        chatbotSend.addEventListener('click', () => this.handleUserInput());
        chatbotInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleUserInput();
        });
        
        chatbotToggle.addEventListener('click', () => {
            chatbotContainer.classList.toggle('chatbot-minimized');
        });
    }
    
    handleUserInput() {
        const input = document.getElementById('chatbot-input');
        const message = input.value.trim();
        
        if (message) {
            this.addMessage(message, 'user');
            input.value = '';
            
            setTimeout(() => {
                const response = this.generateResponse(message);
                this.addMessage(response, 'bot');
            }, 500);
        }
    }
    
    addMessage(message, sender) {
        const messagesContainer = document.getElementById('chatbot-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        messageDiv.textContent = message;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    generateResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        if (this.containsKeywords(lowerMessage, ['hello', 'hi', 'hey', 'greetings'])) {
            return this.getRandomResponse('greeting');
        }
        
        if (this.containsKeywords(lowerMessage, ['name', 'who are you', 'your name'])) {
            return this.getRandomResponse('name');
        }
        
        if (this.containsKeywords(lowerMessage, ['profession', 'job', 'work', 'career', 'what do you do'])) {
            return this.getRandomResponse('profession');
        }
        
        if (this.containsKeywords(lowerMessage, ['projects', 'portfolio', 'work samples', 'chatbot', 'job portal'])) {
            if (this.containsKeywords(lowerMessage, ['chatbot', 'capaciti'])) {
                return `The CAPACITI CHATBOT is one of my key projects. It's an interactive chatbot that you can try here: ${this.portfolioData.projects[0].link}`;
            }
            if (this.containsKeywords(lowerMessage, ['job portal', 'job', 'portal'])) {
                return `I developed a Job Portal website. You can check it out here: ${this.portfolioData.projects[1].link}`;
            }
            return this.getRandomResponse('projects');
        }
        
        if (this.containsKeywords(lowerMessage, ['skills', 'abilities', 'expertise', 'technologies'])) {
            return this.getRandomResponse('skills');
        }
        
        if (this.containsKeywords(lowerMessage, ['resume', 'cv', 'download'])) {
            return this.getRandomResponse('resume');
        }
        
        if (this.containsKeywords(lowerMessage, ['contact', 'reach', 'email', 'hire', 'connect'])) {
            return this.getRandomResponse('contact');
        }
        
        if (this.containsKeywords(lowerMessage, ['experience', 'background'])) {
            return `I have experience in ${this.portfolioData.profession}. My portfolio showcases projects in AI development, web development, and digital marketing.`;
        }
        
        return this.getRandomResponse('default');
    }
    
    containsKeywords(message, keywords) {
        return keywords.some(keyword => message.includes(keyword));
    }
    
    getRandomResponse(category) {
        const responses = this.responses[category];
        return responses[Math.floor(Math.random() * responses.length)];
    }
}

// Initialize chatbot when page loads
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioChatbot();
});
