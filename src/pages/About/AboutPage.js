import React from "react";
import Box from "@mui/material/Box";
import "./AboutPage.css";

export default function AboutPage() {
  const about = `ברוך הבא למערכת ניהול האירועים של צה"ל. המערכת נוצרה על מנת לסייע לך לשלוט ולנהל את האירועים שלך בצורה חכמה ומתקדמת. אחת מהיכולות הייחודיות של המערכת היא היכולת לעקוב אחרי בקשות אישור נוכחות, כשהמוזמנים יכולים לבקש אישור לא להגיע לאירוע עקב סיבה אישית.`;
  const aboutSecondP = `  בסיום האירוע, מארגני האירוע יכולים לעדכן בקלות טבלת נוכחות עדכנית מיום האירוע, ולהצליב מידע זה עם טבלת בקשות חריגות להעדרות מאירוע, כך ניתן לקבל תמונה מלאה של נוכחות המוזמנים בכל אירוע, וחריגות לגבי אי עמידה בהחלטת רמ"ח. המערכת מספקת לך כלי נוח ויעיל לניהול יומיומי של האירועים שלך, ומבט חד וברור של המצב הנוכחי והיסטוריית הנוכחות בכל אירוע.`;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
          height: "35rem",
          width: "70rem",
          background: "#CCCBCB",
          borderRadius: "1rem",
          direction: "rtl",
          "& .actions": {
            color: "text.secondary",
          },
          "& .textPrimary": {
            color: "text.primary",
          },
        }}
      >
        <h1 style={{ fontSize: "2.5rem" }}>אודות המערכת</h1>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "90%",
            height: "100%",
            justifyContent: "right",
            alignItems: "right",
            fontSize: "2rem",
          }}
        >
          <p> {about}</p>
          <p> {aboutSecondP}</p>
        </div>
      </Box>
    </div>
  );
}
