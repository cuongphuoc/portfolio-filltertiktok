document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // Smooth Scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.85;

        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            if (elTop < triggerBottom) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    window.addEventListener('load', revealOnScroll);
    revealOnScroll(); // Initial check

    // Language Toggle logic
    let currentLang = 'en';

    function toggleLanguage() {
        currentLang = currentLang === 'en' ? 'vi' : 'en';
        const langBtn = document.getElementById('lang-switch');
        if (langBtn) langBtn.textContent = currentLang === 'en' ? 'VN' : 'EN';
        
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[currentLang][key]) {
                el.innerHTML = translations[currentLang][key];
            }
        });
    }

    const langBtn = document.getElementById('lang-switch');
    if (langBtn) {
        langBtn.addEventListener('click', toggleLanguage);
    }

    // Navbar background change on scroll
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (nav) {
            if (window.scrollY > 50) {
                nav.style.padding = '1rem 0';
                nav.style.background = 'rgba(5, 5, 5, 0.95)';
            } else {
                nav.style.padding = '1.5rem 0';
                nav.style.background = 'rgba(5, 5, 5, 0.8)';
            }
        }
    });
});

// Translation Dictionary (Moved outside to be accessible if needed, but logic is inside)
const translations = {
    en: {
        "nav-about": "About",
        "nav-services": "Services",
        "nav-projects": "Projects",
        "nav-contact": "Contact",
        "hero-title": 'We Create <span class="neon-text-magenta">Viral</span> Digital Experiences',
        "hero-desc": "Specializing in TikTok filters, AR, and VR experiences that captivate and engage audiences worldwide.",
        "hero-cta": "View Projects",
        "about-title": 'Viral <span class="neon-text-cyan">Interactive</span> Content',
        "about-desc": "PC34 Studio is at the forefront of the digital revolution. We don't just build filters; we create moments. Our focus is on crafting viral interactive content that bridges the gap between brands and their audiences through cutting-edge AR and VR technology.",
        "services-title": 'Our <span class="neon-text-magenta">Services</span>',
        "s1-title": "TikTok Filter Creation",
        "s1-desc": "Custom AR filters designed to go viral and increase brand visibility on the world's fastest-growing platform.",
        "s2-title": "AR Campaigns",
        "s2-desc": "Immersive augmented reality experiences for product launches, events, and marketing campaigns.",
        "s3-title": "VR Experiences",
        "s3-desc": "Tailor-made virtual reality environments and applications for training, entertainment, and brand storytelling.",
        "s4-title": "Viral Strategy",
        "s4-desc": "Data-driven consulting to ensure your interactive content reaches maximum engagement and ROI.",
        "partners-title": 'Brands We\'ve <span class="neon-text-cyan">Elevated</span>',
        "projects-title": 'Featured <span class="neon-text-cyan">Projects</span>',
        "contact-title": 'Let’s make your brand <span class="neon-text-magenta">go viral</span>',
        "contact-desc": "Ready to start your next interactive project? We are.",
        "contact-phone": "Phone: 0896451004",
        "contact-fb": "Facebook Profile",
        "footer-rights": "&copy; 2024 PC34 Studio. All rights reserved."
    },
    vi: {
        "nav-about": "Giới Thiệu",
        "nav-services": "Dịch Vụ",
        "nav-projects": "Dự Án",
        "nav-contact": "Liên Hệ",
        "hero-title": 'Chúng Tôi Tạo Ra Trải Nghiệm Kỹ Thuật Số <span class="neon-text-magenta">Viral</span>',
        "hero-desc": "Chuyên gia về TikTok filter, trải nghiệm AR và VR giúp thu hút và gắn kết khán giả trên toàn thế giới.",
        "hero-cta": "Xem Dự Án",
        "about-title": 'Nội Dung <span class="neon-text-cyan">Tương Tác</span> Viral',
        "about-desc": "PC34 Studio đi đầu trong cuộc cách mạng kỹ thuật số. Chúng tôi không chỉ tạo ra filter; chúng tôi tạo ra những khoảnh khắc. Trọng tâm của chúng tôi là xây dựng nội dung tương tác viral, xóa tan khoảng cách giữa thương hiệu và khách hàng thông qua công nghệ AR và VR tiên tiến.",
        "services-title": 'Dịch Vụ Của <span class="neon-text-magenta">Chúng Tôi</span>',
        "s1-title": "Tạo Filter TikTok",
        "s1-desc": "Filter AR tùy chỉnh được thiết kế để viral và tăng nhận diện thương hiệu trên nền tảng phát triển nhanh nhất thế giới.",
        "s2-title": "Chiến Dịch AR",
        "s2-desc": "Trải nghiệm thực tế tăng cường sống động cho các buổi ra mắt sản phẩm, sự kiện và chiến dịch marketing.",
        "s3-title": "Trải Nghiệm VR",
        "s3-desc": "Môi trường và ứng dụng thực tế ảo được thiết kế riêng cho đào tạo, giải trí và kể chuyện thương hiệu.",
        "s4-title": "Chiến Lược Viral",
        "s4-desc": "Tư vấn dựa trên dữ liệu để đảm bảo nội dung tương tác của bạn đạt được sự gắn kết và hiệu quả tối đa.",
        "partners-title": 'Thương Hiệu Chúng Tôi Đã <span class="neon-text-cyan">Nâng Tầm</span>',
        "projects-title": 'Dự Án <span class="neon-text-cyan">Tiêu Biểu</span>',
        "contact-title": 'Hãy để thương hiệu của bạn <span class="neon-text-magenta">Viral ngay</span>',
        "contact-desc": "Sẵn sàng bắt đầu dự án tương tác tiếp theo? Chúng tôi luôn sẵn lòng.",
        "contact-phone": "SĐT: 0896451004",
        "contact-fb": "Trang Facebook",
        "footer-rights": "&copy; 2024 PC34 Studio. Bản quyền đã được bảo hộ."
    }
};

