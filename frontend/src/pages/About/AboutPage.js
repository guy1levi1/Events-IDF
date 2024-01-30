import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import "./AboutPage.css";

export default function AboutPage() {
  const about = `ברוך הבא למערכת ניהול האירועים של צה"ל. המערכת נוצרה על מנת לסייע לך לשלוט ולנהל את האירועים שלך בצורה חכמה ומתקדמת. אחת מהיכולות הייחודיות של המערכת היא היכולת לעקוב אחרי בקשות אישור נוכחות, כשהמוזמנים יכולים לבקש אישור לא להגיע לאירוע עקב סיבה אישית.`;
  const aboutSecondP = `  בסיום האירוע, מארגני האירוע יכולים לעדכן בקלות טבלת נוכחות עדכנית מיום האירוע, ולהצליב מידע זה עם טבלת בקשות חריגות להעדרות מאירוע, כך ניתן לקבל תמונה מלאה של נוכחות המוזמנים בכל אירוע, וחריגות לגבי אי עמידה בהחלטת רמ"ח. המערכת מספקת לך כלי נוח ויעיל לניהול יומיומי של האירועים שלך, ומבט חד וברור של המצב הנוכחי והיסטוריית הנוכחות בכל אירוע.`;

  useEffect(() => {
    localStorage.removeItem("newEditFormstates");
    localStorage.removeItem("newEditFormIsValid");
  }, []);

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
          alignItems: "center",
          height: "75vh",
          width: "70vw",
          background: "#CCCBCB",
          borderRadius: "1rem",
        }}
      >
        <h1 className="headerAbout">אודות המערכת</h1>
        <div className="textAbout">
          <div>
            <p className="paragraph"> {about}</p>
          </div>
          <div>
            <p className="paragraph" style={{ marginTop: "25px" }}>
              {aboutSecondP}
            </p>
          </div>
        </div>
      </Box>
    </div>
  );
}
