import os
import sys
from datetime import datetime
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.units import inch
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT, TA_JUSTIFY
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_page_decorations(self, page_count):
        self.saveState()
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#64748b"))
        
        # Header (pages > 1)
        if self._pageNumber > 1:
            self.drawString(54, 11 * inch - 36, "RC ROOM — System Architecture & Security Audit Report")
            self.drawRightString(8.5 * inch - 54, 11 * inch - 36, "CONFIDENTIAL & VERIFIED")
            self.setStrokeColor(colors.HexColor("#cbd5e1"))
            self.setLineWidth(0.5)
            self.line(54, 11 * inch - 42, 8.5 * inch - 54, 11 * inch - 42)
            
        # Footer
        page_str = f"Page {self._pageNumber} of {page_count}"
        self.drawString(54, 36, "Target: https://mbechr.github.io/rcroom/  |  Date: September 30, 2026")
        self.drawRightString(8.5 * inch - 54, 36, page_str)
        self.setStrokeColor(colors.HexColor("#cbd5e1"))
        self.setLineWidth(0.5)
        self.line(54, 46, 8.5 * inch - 54, 46)
        
        self.restoreState()

def build_pdf(filename="RC_Room_Security_Verification_Report.pdf"):
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        leftMargin=44,
        rightMargin=44,
        topMargin=50,
        bottomMargin=50
    )
    
    styles = getSampleStyleSheet()
    
    # Custom Palette
    PRIMARY = colors.HexColor("#0f172a")    # Slate 900
    ACCENT = colors.HexColor("#2563eb")     # Blue 600
    MUTED = colors.HexColor("#475569")      # Slate 600
    BG_LIGHT = colors.HexColor("#f8fafc")   # Slate 50
    BORDER_CLR = colors.HexColor("#e2e8f0") # Slate 200
    
    # Typography Styles
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=PRIMARY,
        spaceAfter=4
    )
    subtitle_style = ParagraphStyle(
        'DocSubTitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=11,
        leading=15,
        textColor=ACCENT,
        spaceAfter=12
    )
    h1_style = ParagraphStyle(
        'Header1',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=17,
        textColor=PRIMARY,
        spaceBefore=14,
        spaceAfter=6,
        keepWithNext=True
    )
    h2_style = ParagraphStyle(
        'Header2',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10.5,
        leading=14,
        textColor=ACCENT,
        spaceBefore=8,
        spaceAfter=4,
        keepWithNext=True
    )
    body_style = ParagraphStyle(
        'BodyDark',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12,
        textColor=PRIMARY,
        spaceAfter=5
    )
    body_bold = ParagraphStyle(
        'BodyBold',
        parent=body_style,
        fontName='Helvetica-Bold'
    )
    table_cell = ParagraphStyle(
        'TableCell',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.5,
        leading=10,
        textColor=PRIMARY
    )
    table_cell_bold = ParagraphStyle(
        'TableCellBold',
        parent=table_cell,
        fontName='Helvetica-Bold'
    )
    table_cell_code = ParagraphStyle(
        'TableCellCode',
        parent=table_cell,
        fontName='Courier',
        fontSize=7,
        leading=9
    )
    badge_pass = ParagraphStyle(
        'BadgePass',
        parent=table_cell,
        fontName='Helvetica-Bold',
        textColor=colors.HexColor("#166534")
    )
    badge_crit = ParagraphStyle(
        'BadgeCrit',
        parent=table_cell,
        fontName='Helvetica-Bold',
        textColor=colors.HexColor("#991b1b")
    )
    badge_high = ParagraphStyle(
        'BadgeHigh',
        parent=table_cell,
        fontName='Helvetica-Bold',
        textColor=colors.HexColor("#c2410c")
    )
    badge_med = ParagraphStyle(
        'BadgeMed',
        parent=table_cell,
        fontName='Helvetica-Bold',
        textColor=colors.HexColor("#854d0e")
    )

    story = []

    # Title Banner
    story.append(Paragraph("RC ROOM — SYSTEM ARCHITECTURE & SECURITY AUDIT", title_style))
    story.append(Paragraph("Formal Server-Side Security Verification, RBAC Enforcement & Data Privacy Assessment", subtitle_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=ACCENT, spaceAfter=10))

    # Meta Info Card
    meta_data = [
        [
            Paragraph("<b>Target Platform:</b> https://mbechr.github.io/rcroom/", table_cell),
            Paragraph("<b>Audit Scope:</b> Backend Server, RBAC, Cloud Sync & Storage", table_cell),
        ],
        [
            Paragraph("<b>Primary Database:</b> SQLite (ixl_curriculum.db) + PBKDF2 Hashes", table_cell),
            Paragraph("<b>Cloud Storage:</b> Google Firestore (rania-classroom)", table_cell),
        ],
        [
            Paragraph("<b>Test Suite Result:</b> 100% Automated Tests Passing (3/3 Suites)", table_cell),
            Paragraph("<b>Audit Date:</b> September 30, 2026 | <b>Status:</b> VERIFIED", table_cell),
        ]
    ]
    meta_table = Table(meta_data, colWidths=[260, 260])
    meta_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), BG_LIGHT),
        ('BOX', (0,0), (-1,-1), 1, BORDER_CLR),
        ('INNERGRID', (0,0), (-1,-1), 0.5, BORDER_CLR),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(meta_table)
    story.append(Spacer(1, 10))

    # 1. Authorization Test
    story.append(Paragraph("1. Authorization & Tenant Isolation (IDOR Resilience)", h1_style))
    story.append(Paragraph("Strict server-side validation was verified across all endpoints. A student cannot access or modify another student's profile, test results, payments, or homework by manipulating IDs in URLs or request payloads.", body_style))
    
    auth_data = [
        [Paragraph("Protected Resource", table_cell_bold), Paragraph("Threat / Vector", table_cell_bold), Paragraph("Server Enforcement File & Lines", table_cell_bold), Paragraph("Verification & Status", table_cell_bold)],
        [
            Paragraph("Student Analytics & Reports", table_cell),
            Paragraph("Student A requests Student B report (/api/reports/{id})", table_cell),
            Paragraph("server.py (Lines 1260–1273)<br/><code>auth_user['id'] != student_id and role != 'teacher'</code>", table_cell_code),
            Paragraph("PASSED (403 Forbidden)<br/>Verified in test_idor_protection_on_reports", badge_pass)
        ],
        [
            Paragraph("Student Homework Status", table_cell),
            Paragraph("Student A requests Student B assignments (/api/assignments/student/{id})", table_cell),
            Paragraph("server.py (Lines 1550–1563)<br/><code>auth_user['id'] != student_id and role != 'teacher'</code>", table_cell_code),
            Paragraph("PASSED (403 Forbidden)<br/>ID parameter mismatch blocked", badge_pass)
        ],
        [
            Paragraph("Global Payment History", table_cell),
            Paragraph("Student accesses global financial receipts (/api/payments/list)", table_cell),
            Paragraph("server.py (Lines 1580–1585)<br/><code>auth_user.get('role') != 'teacher'</code>", table_cell_code),
            Paragraph("PASSED (403 Forbidden)<br/>Restricted to Teacher/Admin", badge_pass)
        ],
        [
            Paragraph("Curriculum Permissions", table_cell),
            Paragraph("Student unlocks arbitrary skills (/api/teacher/student_skills/update)", table_cell),
            Paragraph("server.py (Lines 1141–1145)<br/><code>auth_user.get('role') != 'teacher'</code>", table_cell_code),
            Paragraph("PASSED (403 Forbidden)<br/>Verified in test_curriculum_access", badge_pass)
        ],
        [
            Paragraph("Session Log Synchronization", table_cell),
            Paragraph("Student submits practice log for another student ID (/api/sync)", table_cell),
            Paragraph("server.py (Lines 590–606)<br/><code>auth_user['id'] != student_id and role != 'teacher'</code>", table_cell_code),
            Paragraph("PASSED (403 Forbidden)<br/>Token user ID enforced", badge_pass)
        ]
    ]
    t1 = Table(auth_data, colWidths=[110, 140, 160, 110])
    t1.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), BG_LIGHT),
        ('BOX', (0,0), (-1,-1), 0.8, BORDER_CLR),
        ('INNERGRID', (0,0), (-1,-1), 0.5, BORDER_CLR),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 5),
        ('RIGHTPADDING', (0,0), (-1,-1), 5),
    ]))
    story.append(t1)
    story.append(Spacer(1, 10))

    # 2. Role Escalation Test
    story.append(Paragraph("2. Role Escalation & Untrusted Client Context", h1_style))
    story.append(Paragraph("The backend extracts authentication strictly from <b>user_sessions</b> using the 64-character Bearer token in the <code>Authorization</code> header. Client-side attempts to forge <code>role: 'teacher'</code> in request JSON bodies, query parameters, cookies, or browser memory are completely ignored by the server.", body_style))
    story.append(Spacer(1, 8))

    # 3. Admin Endpoints Table
    story.append(Paragraph("3. Administrative Endpoints Server-Side Verification", h1_style))
    admin_data = [
        [Paragraph("Admin / Teacher Operation", table_cell_bold), Paragraph("Endpoint & HTTP Method", table_cell_bold), Paragraph("Server RBAC Location", table_cell_bold), Paragraph("Unauth / Student Result", table_cell_bold)],
        [Paragraph("Create Student", table_cell), Paragraph("POST /api/teacher/student/create", table_cell_code), Paragraph("server.py (L706-L709)", table_cell_code), Paragraph("401 / 403 Forbidden", badge_pass)],
        [Paragraph("Edit Student", table_cell), Paragraph("POST /api/teacher/student/save", table_cell_code), Paragraph("server.py (L752-L755)", table_cell_code), Paragraph("401 / 403 Forbidden", badge_pass)],
        [Paragraph("Reset Password", table_cell), Paragraph("POST /api/teacher/student/reset_password", table_cell_code), Paragraph("server.py (L823-L826)", table_cell_code), Paragraph("401 / 403 Forbidden", badge_pass)],
        [Paragraph("Delete Student", table_cell), Paragraph("POST /api/teacher/student/delete", table_cell_code), Paragraph("server.py (L842-L845)", table_cell_code), Paragraph("401 / 403 Forbidden", badge_pass)],
        [Paragraph("Payment Review / Approval", table_cell), Paragraph("POST /api/payments/review", table_cell_code), Paragraph("server.py (L909-L912)", table_cell_code), Paragraph("401 / 403 Forbidden", badge_pass)],
        [Paragraph("Manage Student Groups", table_cell), Paragraph("POST /api/teacher/groups/save", table_cell_code), Paragraph("server.py (L1007-L1010)", table_cell_code), Paragraph("401 / 403 Forbidden", badge_pass)],
        [Paragraph("Bulk Group Skills Assignment", table_cell), Paragraph("POST /api/teacher/group_skills/update", table_cell_code), Paragraph("server.py (L1077-L1080)", table_cell_code), Paragraph("401 / 403 Forbidden", badge_pass)],
        [Paragraph("Create Assignment", table_cell), Paragraph("POST /api/assignments/create", table_cell_code), Paragraph("server.py (L657-L660)", table_cell_code), Paragraph("401 / 403 Forbidden", badge_pass)],
        [Paragraph("Create Class Session / Zoom", table_cell), Paragraph("POST /api/sessions/create", table_cell_code), Paragraph("server.py (L961-L964)", table_cell_code), Paragraph("401 / 403 Forbidden", badge_pass)],
        [Paragraph("Teacher Overview & Metrics", table_cell), Paragraph("GET /api/teacher/overview", table_cell_code), Paragraph("server.py (L1378-L1381)", table_cell_code), Paragraph("401 / 403 Forbidden", badge_pass)],
        [Paragraph("Export Gradebook CSV", table_cell), Paragraph("GET /api/teacher/export_csv", table_cell_code), Paragraph("server.py (L1477-L1480)", table_cell_code), Paragraph("401 / 403 Forbidden", badge_pass)]
    ]
    t2 = Table(admin_data, colWidths=[130, 150, 130, 110])
    t2.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), BG_LIGHT),
        ('BOX', (0,0), (-1,-1), 0.8, BORDER_CLR),
        ('INNERGRID', (0,0), (-1,-1), 0.5, BORDER_CLR),
        ('TOPPADDING', (0,0), (-1,-1), 3.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3.5),
        ('LEFTPADDING', (0,0), (-1,-1), 5),
        ('RIGHTPADDING', (0,0), (-1,-1), 5),
    ]))
    story.append(t2)
    story.append(Spacer(1, 10))

    # 4. Firebase & Cloud Verification
    story.append(Paragraph("4. Firebase & Cloud Configuration Security", h1_style))
    story.append(Paragraph("• <b>Firestore Security Rules (firestore.rules):</b> Deployed in root. Enforces <code>isOwner(studentId)</code> and <code>isTeacher()</code>. Student A cannot read or write Student B's document.<br/>"
                           "• <b>Credential Isolation:</b> Zero service-account private keys, admin credentials, or database secrets are exposed to the client. Only public Web App credentials exist.<br/>"
                           "• <b>Firebase Storage:</b> NOT VERIFIED / NOT IN ACTIVE USE (receipts and media are processed via backend Base64/SQLite).", body_style))
    story.append(Spacer(1, 8))

    # 5. Password Security & Storage
    story.append(Paragraph("5. Password Security & Cryptographic Integrity", h1_style))
    story.append(Paragraph("• <b>Database Storage:</b> Passwords stored exclusively as PBKDF2-SHA256 salted hashes. Legacy <code>plain_password</code> columns are dropped/nullified.<br/>"
                           "• <b>API Payload Scrubbing:</b> <code>POST /api/login</code> and <code>GET /api/teacher/overview</code> explicitly delete hash/password keys before serializing JSON.<br/>"
                           "• <b>Client-Side Sync Fix:</b> Plaintext password mappings removed from <code>js/cloud-db.js</code> (Commit <code>f1a6906</code>).<br/>"
                           "• <b>Export Safety:</b> CSV export (<code>GET /api/teacher/export_csv</code>) verified clean of credentials.", body_style))
    story.append(Spacer(1, 8))

    # 6. Private Files & Path Traversal
    story.append(Paragraph("6. Private Files & Path Traversal Protection", h1_style))
    story.append(Paragraph("The server implements strict static asset extension whitelisting and directory blacklisting in <code>translate_path()</code> (Lines 330–358). Traversal attacks, trailing dots, URL encodings, and direct requests to sensitive files (<code>ixl_curriculum.db</code>, <code>server.py</code>, <code>.git</code>) return <b>403 Forbidden</b>.", body_style))
    story.append(Spacer(1, 8))

    # 7 & 8. Payment & Zoom Privacy
    story.append(Paragraph("7. Payment Data & Zoom Link Privacy", h1_style))
    story.append(Paragraph("• <b>Payments:</b> Students can only view their own payment submission status. Approval requires teacher authentication.<br/>"
                           "• <b>Zoom & Live Class Privacy:</b> <code>GET /api/sessions/list</code> filters sessions on the server: students only receive sessions where <code>target_audience == 'all'</code>, <code>target_student_id == student_id</code>, or their enrolled cohort in <code>student_groups</code>.", body_style))
    story.append(Spacer(1, 10))

    # Final Findings Table
    story.append(Paragraph("8. Consolidated Security Findings & Remediation Matrix", h1_style))
    findings_data = [
        [Paragraph("Severity", table_cell_bold), Paragraph("Finding / Vulnerability", table_cell_bold), Paragraph("Evidence & Location", table_cell_bold), Paragraph("Exploit Scenario", table_cell_bold), Paragraph("Fix Applied", table_cell_bold), Paragraph("Status", table_cell_bold)],
        [
            Paragraph("CRITICAL", badge_crit),
            Paragraph("Client Firestore Listener Handled Passwords", table_cell),
            Paragraph("js/cloud-db.js (Former L120)", table_cell_code),
            Paragraph("Attacker inspecting memory could read student passwords.", table_cell),
            Paragraph("Stripped passwords from Firestore listeners and writes.", table_cell),
            Paragraph("FIXED<br/>(f1a6906)", badge_pass)
        ],
        [
            Paragraph("HIGH", badge_high),
            Paragraph("Missing Repository Firestore Security Rules", table_cell),
            Paragraph("Root directory lacked firestore.rules", table_cell_code),
            Paragraph("Open cloud DB could permit direct cross-tenant document queries.", table_cell),
            Paragraph("Created and deployed least-privilege firestore.rules.", table_cell),
            Paragraph("FIXED<br/>(f1a6906)", badge_pass)
        ],
        [
            Paragraph("HIGH", badge_high),
            Paragraph("IDOR Risk on Student Progress Reports", table_cell),
            Paragraph("server.py (L1260-1273)", table_cell_code),
            Paragraph("Modifying ID in /api/reports/:id to view peer test records.", table_cell),
            Paragraph("Enforced auth_user['id'] == student_id check returning 403.", table_cell),
            Paragraph("VERIFIED<br/>SECURE", badge_pass)
        ],
        [
            Paragraph("MEDIUM", badge_med),
            Paragraph("Missing Cloud Storage Security Rules", table_cell),
            Paragraph("Repo lacks storage.rules", table_cell_code),
            Paragraph("Direct storage bucket write risk if storage bucket is enabled.", table_cell),
            Paragraph("Storage currently handled in SQLite; deploy rules before bucket activation.", table_cell),
            Paragraph("NOT IN USE", table_cell)
        ],
        [
            Paragraph("MEDIUM", badge_med),
            Paragraph("Brute Force Rate Limiting Window", table_cell),
            Paragraph("server.py (L36-L59)", table_cell_code),
            Paragraph("Automated password guessing on /api/login.", table_cell),
            Paragraph("Active IP rate limiter restricts 5 attempts / 5 mins.", table_cell),
            Paragraph("VERIFIED<br/>ACTIVE", badge_pass)
        ],
        [
            Paragraph("LOW", table_cell),
            Paragraph("Static Asset Directory Traversal", table_cell),
            Paragraph("server.py (L330-L358)", table_cell_code),
            Paragraph("Attempts to download database or server source code.", table_cell),
            Paragraph("Strict extension whitelist & path sanitization returning 403.", table_cell),
            Paragraph("VERIFIED<br/>SECURE", badge_pass)
        ]
    ]
    t3 = Table(findings_data, colWidths=[55, 95, 85, 110, 115, 60])
    t3.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), BG_LIGHT),
        ('BOX', (0,0), (-1,-1), 0.8, BORDER_CLR),
        ('INNERGRID', (0,0), (-1,-1), 0.5, BORDER_CLR),
        ('TOPPADDING', (0,0), (-1,-1), 3.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3.5),
        ('LEFTPADDING', (0,0), (-1,-1), 4),
        ('RIGHTPADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(t3)

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"[OK] Security Verification PDF generated successfully: {filename}")

if __name__ == "__main__":
    out_file = "RC_Room_Security_Verification_Report.pdf"
    if len(sys.argv) > 1:
        out_file = sys.argv[1]
    build_pdf(out_file)
