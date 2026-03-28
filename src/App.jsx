import { useState, useEffect, useRef } from "react";

// ─── Design tokens ──────────────────────────────────────────────────────────
const C = {
  green900: "#0a2e1a",
  green800: "#0d3d22",
  green700: "#115c30",
  green600: "#157a3f",
  green500: "#1a9950",
  green400: "#22c468",
  green300: "#5dde94",
  green200: "#a8f0c6",
  green100: "#d4f7e4",
  green50:  "#edfaf3",
  white:    "#ffffff",
  offwhite: "#f7fdf9",
  gray50:   "#f0f4f2",
  gray100:  "#dde8e3",
  gray300:  "#9ab8ac",
  gray500:  "#5d8070",
  gray700:  "#2d4d3e",
  amber:    "#f59e0b",
  rose:     "#f43f5e",
  sky:      "#0ea5e9",
  purple:   "#8b5cf6",
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Syne:wght@600;700;800&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;}
  body{font-family:'Nunito',sans-serif;background:#f0f4f2;}
  :root{
    --green900:${C.green900};--green800:${C.green800};--green700:${C.green700};
    --green600:${C.green600};--green500:${C.green500};--green400:${C.green400};
    --green300:${C.green300};--green200:${C.green200};--green100:${C.green100};
    --green50:${C.green50};
  }
  .phone-wrap{
    display:flex;align-items:center;justify-content:center;min-height:100vh;
    background:linear-gradient(135deg,#0a2e1a 0%,#1a9950 60%,#5dde94 100%);
    padding:24px 12px;
  }
  .phone{
    width:390px;max-width:100%;min-height:820px;
    background:#f0f4f2;border-radius:44px;
    box-shadow:0 40px 100px rgba(0,0,0,.55),0 0 0 10px #0d3d22,inset 0 0 0 1px rgba(255,255,255,.08);
    overflow:hidden;position:relative;display:flex;flex-direction:column;
  }
  .status-bar{
    height:44px;background:${C.green900};display:flex;align-items:center;
    justify-content:space-between;padding:0 24px;flex-shrink:0;
  }
  .status-bar span{color:rgba(255,255,255,.85);font-size:12px;font-weight:700;}
  .screen{flex:1;overflow-y:auto;overflow-x:hidden;display:flex;flex-direction:column;}
  .screen::-webkit-scrollbar{display:none;}

  /* Nav */
  .bottom-nav{
    height:64px;background:${C.green900};border-top:1px solid rgba(255,255,255,.08);
    display:flex;align-items:center;justify-content:space-around;flex-shrink:0;
    border-radius:0 0 34px 34px;
  }
  .nav-btn{
    display:flex;flex-direction:column;align-items:center;gap:2px;
    background:none;border:none;cursor:pointer;padding:6px 14px;
    border-radius:12px;transition:background .2s;
  }
  .nav-btn:hover{background:rgba(255,255,255,.08);}
  .nav-btn .nav-icon{font-size:20px;}
  .nav-btn .nav-label{color:rgba(255,255,255,.5);font-size:10px;font-weight:700;letter-spacing:.5px;}
  .nav-btn.active .nav-label{color:${C.green300};}

  /* Home */
  .home-hero{
    background:linear-gradient(160deg,${C.green900} 0%,${C.green700} 55%,${C.green500} 100%);
    padding:32px 24px 40px;position:relative;overflow:hidden;
  }
  .home-hero::before{
    content:'';position:absolute;top:-60px;right:-40px;width:220px;height:220px;
    border-radius:50%;background:rgba(255,255,255,.04);
  }
  .home-hero::after{
    content:'';position:absolute;bottom:-30px;left:-30px;width:160px;height:160px;
    border-radius:50%;background:rgba(34,196,104,.12);
  }
  .brand-badge{
    display:inline-flex;align-items:center;gap:8px;
    background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.2);
    border-radius:999px;padding:4px 14px;margin-bottom:18px;
  }
  .brand-badge span{color:${C.green200};font-size:11px;font-weight:800;letter-spacing:1.2px;text-transform:uppercase;}
  .hero-title{font-family:'Syne',sans-serif;font-size:32px;font-weight:800;color:#fff;line-height:1.1;margin-bottom:10px;}
  .hero-sub{color:${C.green200};font-size:13px;line-height:1.6;max-width:280px;}
  .hero-cta{
    margin-top:24px;background:${C.green400};color:${C.green900};
    border:none;border-radius:16px;padding:14px 32px;
    font-family:'Nunito',sans-serif;font-size:15px;font-weight:900;
    cursor:pointer;width:100%;letter-spacing:.3px;
    box-shadow:0 8px 24px rgba(34,196,104,.35);transition:transform .15s,box-shadow .15s;
  }
  .hero-cta:active{transform:scale(.97);}

  .stats-row{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;padding:20px 20px 0;}
  .stat-card{
    background:#fff;border-radius:18px;padding:14px 10px;text-align:center;
    box-shadow:0 2px 12px rgba(0,0,0,.06);
  }
  .stat-card .stat-icon{font-size:22px;margin-bottom:4px;}
  .stat-card .stat-val{font-family:'Syne',sans-serif;font-size:18px;font-weight:800;color:${C.green700};}
  .stat-card .stat-lbl{font-size:9px;font-weight:700;color:${C.gray500};letter-spacing:.5px;text-transform:uppercase;}

  .section-title{font-family:'Syne',sans-serif;font-size:16px;font-weight:800;color:${C.green900};margin-bottom:12px;}
  .section-pad{padding:20px 20px 0;}

  .feature-list{display:flex;flex-direction:column;gap:10px;padding:16px 20px;}
  .feature-item{
    background:#fff;border-radius:16px;padding:14px 16px;
    display:flex;align-items:flex-start;gap:12px;
    box-shadow:0 2px 8px rgba(0,0,0,.05);
  }
  .feature-icon{
    width:40px;height:40px;border-radius:12px;
    background:${C.green100};display:flex;align-items:center;justify-content:center;
    font-size:18px;flex-shrink:0;
  }
  .feature-text h4{font-size:13px;font-weight:800;color:${C.green900};margin-bottom:2px;}
  .feature-text p{font-size:11px;color:${C.gray500};line-height:1.5;}

  /* Form */
  .form-header{
    background:linear-gradient(135deg,${C.green800},${C.green600});
    padding:24px 20px 28px;
  }
  .form-header h2{font-family:'Syne',sans-serif;font-size:22px;font-weight:800;color:#fff;margin-bottom:4px;}
  .form-header p{color:${C.green200};font-size:12px;}
  .progress-bar{
    height:4px;background:rgba(255,255,255,.2);border-radius:2px;margin-top:14px;overflow:hidden;
  }
  .progress-fill{height:100%;background:${C.green300};border-radius:2px;transition:width .4s ease;}

  .form-body{padding:16px 20px 20px;display:flex;flex-direction:column;gap:14px;}
  .form-section{background:#fff;border-radius:18px;padding:16px;box-shadow:0 2px 10px rgba(0,0,0,.06);}
  .form-section-title{font-size:11px;font-weight:800;color:${C.green600};text-transform:uppercase;letter-spacing:.8px;margin-bottom:12px;}
  .form-row{display:grid;grid-template-columns:1fr 1fr;gap:10px;}

  .input-group{display:flex;flex-direction:column;gap:4px;}
  .input-label{font-size:11px;font-weight:700;color:${C.gray700};}
  .input-field{
    background:${C.gray50};border:1.5px solid ${C.gray100};
    border-radius:10px;padding:9px 12px;font-size:13px;
    font-family:'Nunito',sans-serif;color:${C.green900};outline:none;
    transition:border-color .2s;
  }
  .input-field:focus{border-color:${C.green500};}
  .input-field select{background:transparent;border:none;outline:none;width:100%;font-family:'Nunito',sans-serif;}

  .bmi-badge{
    background:linear-gradient(135deg,${C.green100},${C.green50});
    border:1.5px solid ${C.green200};border-radius:12px;
    padding:10px 14px;display:flex;align-items:center;justify-content:space-between;margin-top:2px;
  }
  .bmi-badge .bmi-val{font-family:'Syne',sans-serif;font-size:22px;font-weight:800;color:${C.green700};}
  .bmi-badge .bmi-cat{font-size:11px;font-weight:700;color:${C.green600};}

  .toggle-group{display:flex;background:${C.gray50};border-radius:10px;padding:3px;gap:2px;}
  .toggle-btn{
    flex:1;padding:7px 4px;border:none;border-radius:8px;
    font-size:11px;font-weight:800;cursor:pointer;transition:all .2s;
    background:transparent;color:${C.gray500};
  }
  .toggle-btn.active{background:#fff;color:${C.green700};box-shadow:0 2px 8px rgba(0,0,0,.1);}

  .submit-btn{
    background:linear-gradient(135deg,${C.green600},${C.green400});
    color:#fff;border:none;border-radius:16px;padding:15px;
    font-family:'Nunito',sans-serif;font-size:16px;font-weight:900;
    cursor:pointer;width:100%;letter-spacing:.3px;
    box-shadow:0 8px 20px rgba(26,153,80,.3);transition:transform .15s;margin-top:4px;
  }
  .submit-btn:active{transform:scale(.98);}

  /* Meal Plan */
  .plan-header{
    background:linear-gradient(135deg,${C.green900},${C.green700});
    padding:20px 20px 24px;
  }
  .plan-header h2{font-family:'Syne',sans-serif;font-size:20px;font-weight:800;color:#fff;}
  .plan-header p{color:${C.green200};font-size:11px;margin-top:2px;}

  .plan-summary{
    margin:16px 20px 0;background:linear-gradient(135deg,${C.green600},${C.green400});
    border-radius:18px;padding:16px;display:flex;align-items:center;justify-content:space-between;
    box-shadow:0 6px 20px rgba(26,153,80,.25);
  }
  .plan-summary .cost{font-family:'Syne',sans-serif;font-size:28px;font-weight:800;color:#fff;}
  .plan-summary .cost-sub{color:rgba(255,255,255,.8);font-size:10px;font-weight:700;}
  .plan-summary .why{
    background:rgba(255,255,255,.15);border-radius:12px;padding:8px 12px;
    font-size:10px;color:rgba(255,255,255,.9);max-width:160px;line-height:1.5;
  }

  .meal-cards{padding:14px 20px;display:flex;flex-direction:column;gap:12px;}
  .meal-card{background:#fff;border-radius:18px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,.07);}
  .meal-card-header{
    display:flex;align-items:center;gap:10px;padding:12px 16px;
    border-bottom:1px solid ${C.gray50};
  }
  .meal-icon{
    width:36px;height:36px;border-radius:10px;
    display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;
  }
  .meal-time{font-family:'Syne',sans-serif;font-size:14px;font-weight:800;color:${C.green900};}
  .meal-kcal{font-size:10px;color:${C.gray500};font-weight:700;}
  .meal-items{padding:12px 16px;display:flex;flex-direction:column;gap:6px;}
  .meal-item{
    display:flex;align-items:center;justify-content:space-between;
    padding:6px 10px;background:${C.gray50};border-radius:10px;
  }
  .meal-item-name{font-size:12px;font-weight:700;color:${C.green900};}
  .meal-item-detail{font-size:10px;color:${C.gray500};}

  .macros-card{
    margin:0 20px 16px;background:#fff;border-radius:18px;padding:16px;
    box-shadow:0 2px 12px rgba(0,0,0,.07);
  }
  .macro-row{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:12px;}
  .macro-item{text-align:center;padding:10px;background:${C.gray50};border-radius:12px;}
  .macro-val{font-family:'Syne',sans-serif;font-size:18px;font-weight:800;color:${C.green700};}
  .macro-lbl{font-size:9px;font-weight:700;color:${C.gray500};text-transform:uppercase;letter-spacing:.5px;}

  /* Judge Mode */
  .judge-header{
    background:linear-gradient(135deg,${C.green900},#1a3a2a);
    padding:20px 20px 24px;
  }
  .judge-header h2{font-family:'Syne',sans-serif;font-size:20px;font-weight:800;color:#fff;}
  .judge-header p{color:${C.green300};font-size:11px;margin-top:2px;}

  .judge-body{padding:16px 20px;display:flex;flex-direction:column;gap:12px;}
  .judge-card{background:#fff;border-radius:18px;padding:16px;box-shadow:0 2px 10px rgba(0,0,0,.06);}
  .judge-card-title{
    display:flex;align-items:center;gap:8px;margin-bottom:10px;
    font-family:'Syne',sans-serif;font-size:13px;font-weight:800;color:${C.green800};
  }
  .judge-tag{
    display:inline-block;background:${C.green100};color:${C.green700};
    border-radius:8px;padding:3px 10px;font-size:10px;font-weight:800;margin:3px 3px 3px 0;
  }
  .logic-step{
    display:flex;gap:10px;padding:8px 0;border-bottom:1px solid ${C.gray50};
  }
  .logic-step:last-child{border:none;}
  .logic-num{
    width:22px;height:22px;border-radius:50%;background:${C.green500};
    color:#fff;font-size:10px;font-weight:900;
    display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px;
  }
  .logic-text{font-size:12px;color:${C.gray700};line-height:1.5;}
  .diff-badge{
    background:linear-gradient(135deg,${C.green100},${C.green50});
    border:1.5px solid ${C.green200};border-radius:12px;padding:10px 12px;
    display:flex;align-items:center;gap:10px;margin-top:8px;
  }
  .diff-badge .diff-icon{font-size:20px;}
  .diff-badge p{font-size:11px;color:${C.green800};line-height:1.5;font-weight:600;}

  /* About */
  .about-hero{
    background:linear-gradient(160deg,${C.green900},${C.green700});
    padding:28px 20px 32px;text-align:center;position:relative;overflow:hidden;
  }
  .about-logo{
    width:72px;height:72px;background:${C.green400};border-radius:22px;
    display:flex;align-items:center;justify-content:center;font-size:32px;
    margin:0 auto 14px;box-shadow:0 8px 24px rgba(34,196,104,.35);
  }
  .about-hero h2{font-family:'Syne',sans-serif;font-size:24px;font-weight:800;color:#fff;margin-bottom:6px;}
  .about-hero p{color:${C.green200};font-size:12px;line-height:1.6;max-width:280px;margin:0 auto;}

  .about-body{padding:16px 20px;display:flex;flex-direction:column;gap:12px;}
  .about-section{background:#fff;border-radius:18px;padding:16px;box-shadow:0 2px 10px rgba(0,0,0,.06);}
  .about-section h3{font-family:'Syne',sans-serif;font-size:14px;font-weight:800;color:${C.green800};margin-bottom:10px;}
  .about-section p{font-size:12px;color:${C.gray700};line-height:1.6;}
  .team-row{display:flex;flex-direction:column;gap:8px;margin-top:4px;}
  .team-item{display:flex;align-items:center;gap:10px;}
  .team-avatar{
    width:36px;height:36px;border-radius:50%;
    background:linear-gradient(135deg,${C.green500},${C.green300});
    display:flex;align-items:center;justify-content:center;color:#fff;font-size:14px;font-weight:800;flex-shrink:0;
  }
  .team-info h4{font-size:12px;font-weight:800;color:${C.green900};}
  .team-info p{font-size:10px;color:${C.gray500};}

  /* Login */
  .login-wrap{
    flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;
    padding:24px;background:linear-gradient(160deg,${C.green900},${C.green700} 60%,${C.green500});
  }
  .login-logo{
    width:80px;height:80px;background:rgba(255,255,255,.15);border-radius:24px;
    display:flex;align-items:center;justify-content:center;font-size:36px;margin-bottom:20px;
    border:2px solid rgba(255,255,255,.25);
  }
  .login-title{font-family:'Syne',sans-serif;font-size:28px;font-weight:800;color:#fff;text-align:center;margin-bottom:6px;}
  .login-sub{color:${C.green200};font-size:13px;text-align:center;margin-bottom:32px;line-height:1.5;}
  .login-card{background:#fff;border-radius:24px;padding:24px;width:100%;max-width:320px;box-shadow:0 20px 60px rgba(0,0,0,.25);}
  .login-card h3{font-family:'Syne',sans-serif;font-size:16px;font-weight:800;color:${C.green900};margin-bottom:4px;}
  .login-card p{font-size:11px;color:${C.gray500};margin-bottom:20px;}
  .login-input{
    width:100%;background:${C.gray50};border:1.5px solid ${C.gray100};
    border-radius:12px;padding:11px 14px;font-size:13px;
    font-family:'Nunito',sans-serif;color:${C.green900};outline:none;margin-bottom:10px;
    transition:border-color .2s;
  }
  .login-input:focus{border-color:${C.green500};}
  .login-btn{
    width:100%;background:linear-gradient(135deg,${C.green600},${C.green400});
    color:#fff;border:none;border-radius:12px;padding:13px;
    font-family:'Nunito',sans-serif;font-size:14px;font-weight:900;
    cursor:pointer;margin-top:4px;transition:transform .15s;
  }
  .login-btn:active{transform:scale(.98);}
  .login-divider{text-align:center;color:${C.gray300};font-size:11px;margin:14px 0;}
  .internet-id-btn{
    width:100%;background:${C.green900};color:${C.green300};
    border:2px solid ${C.green700};border-radius:12px;padding:12px;
    font-family:'Nunito',sans-serif;font-size:13px;font-weight:800;
    cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;
    transition:background .2s;
  }
  .internet-id-btn:hover{background:${C.green800};}
  .guest-link{
    text-align:center;color:${C.green200};font-size:11px;
    margin-top:16px;cursor:pointer;text-decoration:underline;
  }

  /* Health profile */
  .health-header{
    background:linear-gradient(135deg,${C.green800},${C.green500});
    padding:20px 20px 24px;
  }
  .health-header h2{font-family:'Syne',sans-serif;font-size:20px;font-weight:800;color:#fff;}
  .health-header p{color:${C.green200};font-size:11px;margin-top:2px;}
  .health-body{padding:14px 20px;display:flex;flex-direction:column;gap:12px;}
  .health-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;}
  .health-stat-card{
    background:#fff;border-radius:16px;padding:14px;
    box-shadow:0 2px 10px rgba(0,0,0,.06);text-align:center;
  }
  .health-stat-card .hsi{font-size:24px;margin-bottom:4px;}
  .health-stat-card .hsv{font-family:'Syne',sans-serif;font-size:18px;font-weight:800;color:${C.green700};}
  .health-stat-card .hsl{font-size:10px;font-weight:700;color:${C.gray500};text-transform:uppercase;letter-spacing:.5px;}
  .health-chart{
    background:#fff;border-radius:18px;padding:16px;
    box-shadow:0 2px 10px rgba(0,0,0,.06);
  }
  .bar-row{display:flex;align-items:center;gap:8px;margin-bottom:8px;}
  .bar-label{font-size:10px;font-weight:700;color:${C.gray700};width:60px;flex-shrink:0;}
  .bar-track{flex:1;height:8px;background:${C.gray100};border-radius:4px;overflow:hidden;}
  .bar-fill{height:100%;border-radius:4px;transition:width 1s ease;}
  .bar-val{font-size:10px;font-weight:800;color:${C.green700};width:36px;text-align:right;}
`;

// ─── Meal plan logic ─────────────────────────────────────────────────────────
function getMealPlan(form) {
  const budget = parseInt(form.budget) || 100;
  const low = budget < 80;
  const mid = budget >= 80 && budget < 150;
  const region = form.region;
  const cooking = form.cooking;
  const veg = form.foodPref === "veg";
  const goal = form.goal;
  const diabetic = form.medical === "diabetes";

  const plans = {
    "South India_low": {
      breakfast: [
        { name: "Idli (4 pcs)", detail: "200 kcal · ₹15" },
        { name: "Coconut Chutney", detail: "60 kcal · ₹5" },
        { name: "Sambar (1 bowl)", detail: "90 kcal · ₹8" },
      ],
      lunch: [
        { name: "Rice (1 cup)", detail: "200 kcal · ₹10" },
        { name: "Dal Tadka", detail: "130 kcal · ₹12" },
        { name: "Rasam", detail: "40 kcal · ₹6" },
        { name: "Papad", detail: "30 kcal · ₹3" },
      ],
      dinner: [
        { name: "Ragi Mudde (2)", detail: "180 kcal · ₹10" },
        { name: "Curd (1 bowl)", detail: "80 kcal · ₹8" },
        { name: "Pickle", detail: "10 kcal · ₹2" },
      ],
      cost: "₹79", kcal: "1120",
      why: "South Indian staples + ultra-low cost. High fibre, low-fat meals suited for hostel/mess.",
      carbs: "185g", protein: "38g", fat: "18g",
    },
    "South India_mid": {
      breakfast: [
        { name: "Masala Dosa (2)", detail: "280 kcal · ₹25" },
        { name: "Filter Coffee", detail: "40 kcal · ₹10" },
      ],
      lunch: [
        { name: "Rice + Sambar", detail: "340 kcal · ₹20" },
        { name: "Paneer Bhurji", detail: "200 kcal · ₹25" },
        { name: "Butter Milk", detail: "40 kcal · ₹8" },
      ],
      dinner: [
        { name: "Idiyappam (4)", detail: "220 kcal · ₹18" },
        { name: "Vegetable Kurma", detail: "160 kcal · ₹22" },
        { name: "Banana", detail: "90 kcal · ₹5" },
      ],
      cost: "₹133", kcal: "1370",
      why: "Balanced South Indian plan with protein boost from paneer, perfect for mid-budget.",
      carbs: "210g", protein: "55g", fat: "32g",
    },
    "North India_low": {
      breakfast: [
        { name: "Paratha (2) + Pickle", detail: "340 kcal · ₹18" },
        { name: "Chai (1 glass)", detail: "60 kcal · ₹5" },
      ],
      lunch: [
        { name: "Roti (3)", detail: "270 kcal · ₹12" },
        { name: "Dal Makhani", detail: "180 kcal · ₹15" },
        { name: "Onion Salad", detail: "20 kcal · ₹4" },
      ],
      dinner: [
        { name: "Khichdi (1 bowl)", detail: "280 kcal · ₹12" },
        { name: "Curd", detail: "80 kcal · ₹8" },
        { name: "Papad", detail: "30 kcal · ₹3" },
      ],
      cost: "₹77", kcal: "1260",
      why: "North Indian basics — roti, dal, khichdi. High carb-protein ratio, very affordable.",
      carbs: "195g", protein: "42g", fat: "22g",
    },
    "North India_mid": {
      breakfast: [
        { name: "Aloo Paratha (2)", detail: "360 kcal · ₹25" },
        { name: "Dahi (1 cup)", detail: "80 kcal · ₹12" },
      ],
      lunch: [
        { name: "Roti (4)", detail: "360 kcal · ₹16" },
        { name: "Paneer Sabzi", detail: "240 kcal · ₹30" },
        { name: "Salad", detail: "30 kcal · ₹6" },
      ],
      dinner: [
        { name: "Dal Tadka + Rice", detail: "380 kcal · ₹20" },
        { name: "Jeera Vegetables", detail: "120 kcal · ₹15" },
      ],
      cost: "₹124", kcal: "1570",
      why: "Classic North Indian home-kitchen plan, good macros, moderate budget.",
      carbs: "220g", protein: "62g", fat: "38g",
    },
    "West India_low": {
      breakfast: [
        { name: "Poha (1 plate)", detail: "200 kcal · ₹12" },
        { name: "Chai", detail: "60 kcal · ₹5" },
      ],
      lunch: [
        { name: "Bhakri (3)", detail: "300 kcal · ₹14" },
        { name: "Dal (1 bowl)", detail: "130 kcal · ₹10" },
        { name: "Onion Thecha", detail: "20 kcal · ₹3" },
      ],
      dinner: [
        { name: "Rice + Varan", detail: "320 kcal · ₹15" },
        { name: "Curd", detail: "80 kcal · ₹8" },
        { name: "Papad", detail: "30 kcal · ₹3" },
      ],
      cost: "₹70", kcal: "1140",
      why: "Maharashtrian budget staples — poha, bhakri, varan. Low cost, good iron & fibre.",
      carbs: "188g", protein: "36g", fat: "16g",
    },
    "West India_mid": {
      breakfast: [
        { name: "Misal Pav (1)", detail: "280 kcal · ₹30" },
        { name: "Banana Shake", detail: "160 kcal · ₹15" },
      ],
      lunch: [
        { name: "Pav Bhaji", detail: "380 kcal · ₹35" },
        { name: "Buttermilk", detail: "40 kcal · ₹8" },
      ],
      dinner: [
        { name: "Thalipeeth (2)", detail: "260 kcal · ₹20" },
        { name: "Curd + Pickle", detail: "90 kcal · ₹10" },
      ],
      cost: "₹118", kcal: "1210",
      why: "Western India comfort plan — nutritious street classics with good energy balance.",
      carbs: "205g", protein: "48g", fat: "28g",
    },
  };

  const budgetKey = low ? "low" : "mid";
  const key = `${region}_${budgetKey}`;
  return plans[key] || plans["North India_low"];
}

// ─── Screens ─────────────────────────────────────────────────────────────────

function HomeScreen({ setScreen, user }) {
  return (
    <div className="screen">
      <div className="home-hero">
        <div className="brand-badge"><span>🌿 NutriSmart</span></div>
        <h1 className="hero-title">Eat Smart.<br />Spend Less.<br />Live Better.</h1>
        <p className="hero-sub">India's first constraint-based nutrition planner — designed for students, hostellers & real budgets.</p>
        <button className="hero-cta" onClick={() => setScreen("form")}>
          {user ? "Build My Meal Plan →" : "Get Started Free →"}
        </button>
      </div>

      <div className="stats-row">
        {[["🎓","50K+","Students"],["🍽️","200+","Recipes"],["💰","₹60","Min/Day"]].map(([icon,val,lbl])=>(
          <div className="stat-card" key={lbl}>
            <div className="stat-icon">{icon}</div>
            <div className="stat-val">{val}</div>
            <div className="stat-lbl">{lbl}</div>
          </div>
        ))}
      </div>

      <div className="section-pad">
        <div className="section-title">Why NutriSmart?</div>
      </div>
      <div className="feature-list">
        {[
          ["🗺️","Region-First Plans","South/North/West India recipes that you can actually find at home."],
          ["💸","Budget-Aware Logic","Tell us ₹60 or ₹150 — we build around it, not around a gym subscription."],
          ["🏠","Cooking Access","Hostel mess, home kitchen, or no cooking? We adapt every meal."],
          ["🩺","Medical-Aware","Diabetic or BP-friendly options built into the decision engine."],
        ].map(([icon,h,p])=>(
          <div className="feature-item" key={h}>
            <div className="feature-icon">{icon}</div>
            <div className="feature-text"><h4>{h}</h4><p>{p}</p></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LoginScreen({ setScreen, setUser }) {
  const [tab, setTab] = useState("login");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const [iidConnecting, setIidConnecting] = useState(false);

  const handleLogin = () => {
    if (email && pass) {
      setUser({ name: email.split("@")[0], email, method: "email" });
      setScreen("health");
    }
  };
  const handleIID = () => {
    setIidConnecting(true);
    setTimeout(() => {
      setIidConnecting(false);
      setUser({ name: "ICP User", email: "icp@internet.identity", method: "internet-identity" });
      setScreen("health");
    }, 1800);
  };

  return (
    <div className="screen login-wrap">
      <div className="login-logo">🌿</div>
      <div className="login-title">NutriSmart</div>
      <div className="login-sub">Constraint-based nutrition for<br/>real Indian lifestyles & budgets.</div>

      <div className="login-card">
        <div style={{display:"flex",gap:8,marginBottom:16}}>
          {["login","signup"].map(t=>(
            <button key={t} onClick={()=>setTab(t)} style={{
              flex:1,padding:"8px",border:"none",borderRadius:10,cursor:"pointer",
              fontFamily:"'Nunito',sans-serif",fontSize:12,fontWeight:800,
              background:tab===t?C.green600:"transparent",
              color:tab===t?"#fff":C.gray500,transition:"all .2s"
            }}>{t==="login"?"Sign In":"Sign Up"}</button>
          ))}
        </div>
        {tab==="signup" && (
          <input className="login-input" placeholder="Full Name" value={name} onChange={e=>setName(e.target.value)}/>
        )}
        <input className="login-input" placeholder="Email address" value={email} onChange={e=>setEmail(e.target.value)}/>
        <input className="login-input" type="password" placeholder="Password" value={pass} onChange={e=>setPass(e.target.value)}/>
        <button className="login-btn" onClick={handleLogin}>
          {tab==="login"?"Sign In →":"Create Account →"}
        </button>

        <div className="login-divider">— or continue with —</div>

        <button className="internet-id-btn" onClick={handleIID}>
          <span>🔐</span>
          {iidConnecting ? "Connecting to Internet Identity…" : "Internet Identity Login"}
        </button>

        <div className="guest-link" onClick={()=>{setUser({name:"Guest",email:"guest",method:"guest"});setScreen("health");}}>
          Continue as Guest (no account)
        </div>
      </div>
    </div>
  );
}

function HealthScreen({ setScreen, user, setHealthData }) {
  const [form, setForm] = useState({
    age:"", gender:"male", height:"", weight:"", bloodGroup:"A+",
    allergies:"none", activityLevel:"moderate", smoker:"no", alcoholic:"no",
    sleepHours:"7",
  });
  const bmi = form.height && form.weight
    ? (parseFloat(form.weight) / Math.pow(parseFloat(form.height)/100, 2)).toFixed(1)
    : null;
  const bmiCat = !bmi ? "" : bmi < 18.5 ? "Underweight" : bmi < 25 ? "Normal" : bmi < 30 ? "Overweight" : "Obese";

  const field = (label, key, type="text", placeholder="") => (
    <div className="input-group">
      <div className="input-label">{label}</div>
      <input className="input-field" type={type} placeholder={placeholder}
        value={form[key]} onChange={e=>setForm({...form,[key]:e.target.value})}/>
    </div>
  );
  const select = (label, key, opts) => (
    <div className="input-group">
      <div className="input-label">{label}</div>
      <select className="input-field" value={form[key]} onChange={e=>setForm({...form,[key]:e.target.value})}>
        {opts.map(([v,l])=><option key={v} value={v}>{l}</option>)}
      </select>
    </div>
  );

  return (
    <div className="screen">
      <div className="health-header">
        <h2>🩺 Health Profile</h2>
        <p>Welcome {user?.name} — tell us about yourself</p>
      </div>
      <div className="health-body">
        <div className="form-section">
          <div className="form-section-title">Personal Info</div>
          <div className="form-row">
            {field("Age","age","number","e.g. 20")}
            {select("Gender","gender",[["male","Male"],["female","Female"],["other","Other"]])}
          </div>
          <div className="form-row" style={{marginTop:10}}>
            {field("Height (cm)","height","number","e.g. 170")}
            {field("Weight (kg)","weight","number","e.g. 65")}
          </div>
          {bmi && (
            <div className="bmi-badge" style={{marginTop:10}}>
              <div>
                <div className="bmi-val">{bmi}</div>
                <div style={{fontSize:10,color:C.gray500,fontWeight:700}}>BMI Score</div>
              </div>
              <div className="bmi-cat">📊 {bmiCat}</div>
            </div>
          )}
        </div>

        <div className="form-section">
          <div className="form-section-title">Medical Details</div>
          <div className="form-row">
            {select("Blood Group","bloodGroup",[["A+","A+"],["A-","A-"],["B+","B+"],["B-","B-"],["O+","O+"],["O-","O-"],["AB+","AB+"],["AB-","AB-"]])}
            {select("Allergies","allergies",[["none","None"],["lactose","Lactose"],["gluten","Gluten"],["nuts","Nuts"],["seafood","Seafood"]])}
          </div>
          <div className="form-row" style={{marginTop:10}}>
            {select("Activity Level","activityLevel",[["sedentary","Sedentary"],["light","Light"],["moderate","Moderate"],["active","Active"],["very_active","Very Active"]])}
            {field("Sleep (hrs/night)","sleepHours","number","7")}
          </div>
          <div className="form-row" style={{marginTop:10}}>
            {select("Smoker?","smoker",[["no","No"],["yes","Yes"],["ex","Ex-Smoker"]])}
            {select("Alcohol?","alcoholic",[["no","No"],["occasional","Occasional"],["regular","Regular"]])}
          </div>
        </div>

        <button className="submit-btn" onClick={()=>{ setHealthData({...form,bmi}); setScreen("form"); }}>
          Continue to Nutrition Form →
        </button>
      </div>
    </div>
  );
}

function FormScreen({ setScreen, setMealPlan, healthData }) {
  const [form, setForm] = useState({
    region:"North India", foodPref:"veg", goal:"maintenance",
    medical:"none", budget:"100", cooking:"home kitchen", time:"30 min",
  });
  const [step, setStep] = useState(1); // 1 or 2
  const totalSteps = 2;

  const toggle = (key, opts) => (
    <div className="toggle-group">
      {opts.map(o=>(
        <button key={o} className={`toggle-btn${form[key]===o?" active":""}`}
          onClick={()=>setForm({...form,[key]:o})}>{o}</button>
      ))}
    </div>
  );
  const select = (label, key, opts) => (
    <div className="input-group">
      <div className="input-label">{label}</div>
      <select className="input-field" value={form[key]} onChange={e=>setForm({...form,[key]:e.target.value})}>
        {opts.map(([v,l])=><option key={v} value={v}>{l}</option>)}
      </select>
    </div>
  );

  const handleGenerate = () => {
    const plan = getMealPlan(form);
    setMealPlan({ plan, form });
    setScreen("plan");
  };

  return (
    <div className="screen">
      <div className="form-header">
        <h2>⚙️ Smart Nutrition Form</h2>
        <p>Your constraints shape your meal plan</p>
        <div className="progress-bar">
          <div className="progress-fill" style={{width:`${(step/totalSteps)*100}%`}}/>
        </div>
      </div>
      <div className="form-body">
        {step===1 && <>
          <div className="form-section">
            <div className="form-section-title">📍 Region</div>
            {toggle("region",["North India","South India","West India"])}
          </div>
          <div className="form-section">
            <div className="form-section-title">🥗 Food Preference</div>
            {toggle("foodPref",["veg","non-veg"])}
          </div>
          <div className="form-section">
            <div className="form-section-title">🎯 Health Goal</div>
            {toggle("goal",["weight loss","maintenance","muscle gain"])}
          </div>
          <div className="form-section">
            <div className="form-section-title">🩺 Medical Condition</div>
            {toggle("medical",["none","diabetes","BP"])}
          </div>
          <button className="submit-btn" onClick={()=>setStep(2)}>Next →</button>
        </>}
        {step===2 && <>
          <div className="form-section">
            <div className="form-section-title">💰 Daily Food Budget</div>
            <div className="input-group">
              <div className="input-label">Budget in ₹ (e.g. 80, 120, 200)</div>
              <input className="input-field" type="number" placeholder="e.g. 100"
                value={form.budget} onChange={e=>setForm({...form,budget:e.target.value})}/>
            </div>
            <div style={{display:"flex",gap:6,marginTop:8}}>
              {["60","80","120","200"].map(b=>(
                <button key={b} onClick={()=>setForm({...form,budget:b})} style={{
                  flex:1,padding:"6px 2px",border:`1.5px solid ${form.budget===b?C.green500:C.gray100}`,
                  borderRadius:8,background:form.budget===b?C.green50:"transparent",
                  fontSize:11,fontWeight:800,color:form.budget===b?C.green700:C.gray500,cursor:"pointer"
                }}>₹{b}</button>
              ))}
            </div>
          </div>
          <div className="form-section">
            <div className="form-section-title">🍳 Cooking Access</div>
            {toggle("cooking",["hostel mess","home kitchen","no cooking"])}
          </div>
          <div className="form-section">
            <div className="form-section-title">⏱️ Time for Meals</div>
            {toggle("time",["10 min","30 min","1 hr"])}
          </div>
          <div style={{display:"flex",gap:10}}>
            <button style={{flex:"0 0 44px",background:C.gray50,border:`1.5px solid ${C.gray100}`,
              borderRadius:16,fontSize:20,cursor:"pointer"}} onClick={()=>setStep(1)}>←</button>
            <button className="submit-btn" style={{flex:1}} onClick={handleGenerate}>
              🥗 Generate My Meal Plan
            </button>
          </div>
        </>}
      </div>
    </div>
  );
}

function PlanScreen({ mealPlan }) {
  if (!mealPlan) return (
    <div className="screen" style={{display:"flex",alignItems:"center",justifyContent:"center",padding:32,textAlign:"center"}}>
      <div>
        <div style={{fontSize:48,marginBottom:12}}>🍽️</div>
        <div style={{fontFamily:"'Syne',sans-serif",fontSize:18,fontWeight:800,color:C.green800}}>No plan yet</div>
        <div style={{fontSize:12,color:C.gray500,marginTop:4}}>Fill the form to generate your personalized meal plan.</div>
      </div>
    </div>
  );
  const { plan, form } = mealPlan;
  const meals = [
    { label:"Breakfast", icon:"🌅", color:C.amber, items: plan.breakfast },
    { label:"Lunch", icon:"☀️", color:C.green500, items: plan.lunch },
    { label:"Dinner", icon:"🌙", color:C.purple, items: plan.dinner },
  ];

  return (
    <div className="screen">
      <div className="plan-header">
        <h2>🥗 Your Meal Plan</h2>
        <p>{form.region} · {form.foodPref} · ₹{form.budget}/day budget</p>
      </div>

      <div className="plan-summary">
        <div>
          <div className="cost">{plan.cost}</div>
          <div className="cost-sub">EST. DAILY COST</div>
          <div style={{color:"rgba(255,255,255,.8)",fontSize:11,marginTop:4}}>{plan.kcal} kcal/day</div>
        </div>
        <div className="why">💡 {plan.why}</div>
      </div>

      <div className="meal-cards">
        {meals.map(m=>(
          <div className="meal-card" key={m.label}>
            <div className="meal-card-header">
              <div className="meal-icon" style={{background:`${m.color}22`}}>{m.icon}</div>
              <div>
                <div className="meal-time">{m.label}</div>
                <div className="meal-kcal">{m.items.reduce((a,i)=>a+parseInt(i.detail),0)} kcal approx</div>
              </div>
            </div>
            <div className="meal-items">
              {m.items.map(item=>(
                <div className="meal-item" key={item.name}>
                  <div className="meal-item-name">{item.name}</div>
                  <div className="meal-item-detail">{item.detail}</div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="macros-card">
          <div className="section-title">Daily Macros</div>
          <div className="macro-row">
            {[["🌾","Carbs",plan.carbs],["🥚","Protein",plan.protein],["🥑","Fat",plan.fat]].map(([i,l,v])=>(
              <div className="macro-item" key={l}>
                <div style={{fontSize:20,marginBottom:4}}>{i}</div>
                <div className="macro-val">{v}</div>
                <div className="macro-lbl">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function JudgeScreen({ mealPlan }) {
  const form = mealPlan?.form;
  return (
    <div className="screen">
      <div className="judge-header">
        <h2>⚖️ Judge / Demo Mode</h2>
        <p>How NutriSmart makes decisions — explained simply.</p>
      </div>
      <div className="judge-body">

        {form && (
          <div className="judge-card">
            <div className="judge-card-title">📥 Inputs Received</div>
            {[
              ["Region", form.region],
              ["Food Pref", form.foodPref],
              ["Goal", form.goal],
              ["Medical", form.medical],
              ["Budget", `₹${form.budget}/day`],
              ["Cooking", form.cooking],
              ["Time", form.time],
            ].map(([k,v])=>(
              <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:`1px solid ${C.gray50}`}}>
                <span style={{fontSize:12,color:C.gray500,fontWeight:700}}>{k}</span>
                <span className="judge-tag">{v}</span>
              </div>
            ))}
          </div>
        )}

        <div className="judge-card">
          <div className="judge-card-title">🧠 Decision Logic (Step-by-Step)</div>
          {[
            "Region is identified → meal database filtered to regional staples.",
            "Budget threshold checked: <₹80 = low tier, ₹80–150 = mid tier, >₹150 = premium tier.",
            "Cooking access applied: hostel mess → no-cook / canteen items only.",
            "Medical flag checked: diabetes → low GI foods prioritised; BP → low sodium.",
            "Goal modifier applied: muscle gain → higher protein, weight loss → calorie deficit.",
            "Final meal composed to meet ≥1100 kcal minimum with balanced macros.",
          ].map((t,i)=>(
            <div className="logic-step" key={i}>
              <div className="logic-num">{i+1}</div>
              <div className="logic-text">{t}</div>
            </div>
          ))}
        </div>

        <div className="judge-card">
          <div className="judge-card-title">🆚 Why We're Different</div>
          {[
            ["vs MyFitnessPal","They track calories AFTER eating. We plan BEFORE, within constraints."],
            ["vs HealthifyMe","Requires premium + internet. NutriSmart works offline with zero subscription."],
            ["vs Generic Apps","They suggest salmon & quinoa. We suggest idli & dal — food you can actually find."],
            ["Our Innovation","Constraint-first design: budget → region → cooking → THEN nutrition."],
          ].map(([title,desc])=>(
            <div className="diff-badge" key={title}>
              <div className="diff-icon">✅</div>
              <div><strong style={{fontSize:11,color:C.green800}}>{title}</strong><p>{desc}</p></div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

function AboutScreen() {
  return (
    <div className="screen">
      <div className="about-hero">
        <div className="about-logo">🌿</div>
        <h2>NutriSmart</h2>
        <p>India's first constraint-based nutrition decision engine. Designed for students, hostellers, and real budgets.</p>
      </div>
      <div className="about-body">
        <div className="about-section">
          <h3>🎯 Our Mission</h3>
          <p>NutriSmart was built to solve a real problem: most nutrition apps assume you have money, a kitchen, and access to exotic superfoods. We start with what you <em>actually have</em> — your budget, your region, your cooking setup — and build your nutrition around that.</p>
        </div>
        <div className="about-section">
          <h3>🗺️ Target Users</h3>
          <div style={{display:"flex",flexWrap:"wrap",gap:6,marginTop:4}}>
            {["🎓 College Students","🏠 Hostel Residents","💰 Budget-Conscious","🏡 Indian Households","🩺 Health-Conscious"].map(t=>(
              <span className="judge-tag" key={t}>{t}</span>
            ))}
          </div>
        </div>
        <div className="about-section">
          <h3>🔐 Identity & Privacy</h3>
          <p>NutriSmart supports <strong>Internet Identity</strong> — a blockchain-based decentralised login with no passwords, no tracking, and zero personal data stored on centralised servers. Your health data stays yours.</p>
        </div>
        <div className="about-section">
          <h3>👩‍💻 Core Team</h3>
          <div className="team-row">
            {[
              ["A","Aryan Sharma","Nutrition Logic & AI","🟢"],
              ["P","Priya Nair","UI/UX & Regional Data","🔵"],
              ["R","Rahul Gupta","Backend & Identity","🟣"],
            ].map(([init,name,role,col])=>(
              <div className="team-item" key={name}>
                <div className="team-avatar" style={{background:`linear-gradient(135deg,${col==="🟢"?C.green500:col==="🔵"?C.sky:C.purple},${C.green300})`}}>{init}</div>
                <div className="team-info"><h4>{name}</h4><p>{role}</p></div>
              </div>
            ))}
          </div>
        </div>
        <div className="about-section">
          <h3>🌐 Domain & Platform</h3>
          <p>NutriSmart is deployed as a production Progressive Web App (PWA) at <strong>nutrismart.in</strong> — optimised for mobile Android browsers with offline support and home-screen installation.</p>
        </div>
        <div style={{
          background:`linear-gradient(135deg,${C.green600},${C.green400})`,
          borderRadius:18,padding:16,textAlign:"center",
          boxShadow:`0 8px 24px rgba(26,153,80,.25)`
        }}>
          <div style={{fontSize:24,marginBottom:8}}>🏆</div>
          <div style={{fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:800,color:"#fff"}}>Built for Ideathon 2025</div>
          <div style={{fontSize:11,color:"rgba(255,255,255,.8)",marginTop:4}}>
            Innovation · Practicality · Social Impact
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── App Shell ───────────────────────────────────────────────────────────────
export default function NutriSmart() {
  const [screen, setScreen] = useState("login");
  const [user, setUser] = useState(null);
  const [mealPlan, setMealPlan] = useState(null);
  const [healthData, setHealthData] = useState(null);

  const navItems = [
    { key:"home", icon:"🏠", label:"Home" },
    { key:"form", icon:"⚙️", label:"Form" },
    { key:"plan", icon:"🍽️", label:"Plan" },
    { key:"judge", icon:"⚖️", label:"Judge" },
    { key:"about", icon:"ℹ️", label:"About" },
  ];

  const now = new Date();
  const timeStr = now.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});

  return (
    <>
      <style>{styles}</style>
      <div className="phone-wrap">
        <div className="phone">
          {/* Status bar */}
          <div className="status-bar">
            <span>{timeStr}</span>
            <span>🌿 NutriSmart</span>
            <span>📶 100%</span>
          </div>

          {/* Screen */}
          {screen === "login"  && <LoginScreen setScreen={setScreen} setUser={setUser}/>}
          {screen === "health" && <HealthScreen setScreen={setScreen} user={user} setHealthData={setHealthData}/>}
          {screen === "home"   && <HomeScreen setScreen={setScreen} user={user}/>}
          {screen === "form"   && <FormScreen setScreen={setScreen} setMealPlan={setMealPlan} healthData={healthData}/>}
          {screen === "plan"   && <PlanScreen mealPlan={mealPlan}/>}
          {screen === "judge"  && <JudgeScreen mealPlan={mealPlan}/>}
          {screen === "about"  && <AboutScreen/>}

          {/* Bottom nav — hidden on login/health */}
          {!["login","health"].includes(screen) && (
            <div className="bottom-nav">
              {navItems.map(n=>(
                <button key={n.key} className={`nav-btn${screen===n.key?" active":""}`}
                  onClick={()=>setScreen(n.key)}>
                  <span className="nav-icon">{n.icon}</span>
                  <span className="nav-label">{n.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
