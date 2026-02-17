import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PdfDownloadService {

  constructor() { }

  downloadEnrollmentForm() {
    // Create a temporary iframe for better print handling
    this.createPrintableFormWithIframe();
  }

  private createPrintableFormWithIframe() {
    // Create iframe
    const iframe = document.createElement('iframe');
    iframe.style.position = 'absolute';
    iframe.style.top = '-10000px';
    iframe.style.left = '-10000px';
    iframe.style.width = '210mm';
    iframe.style.height = '297mm';
    
    document.body.appendChild(iframe);
    
    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
    if (iframeDoc) {
      iframeDoc.open();
      iframeDoc.write(this.getFormHTML());
      iframeDoc.close();
      
      // Wait for content to load then print
      iframe.onload = () => {
        setTimeout(() => {
          iframe.contentWindow?.print();
          // Remove iframe after printing
          setTimeout(() => {
            document.body.removeChild(iframe);
          }, 1000);
        }, 500);
      };
    }
  }

  private createPrintableForm() {
    const printWindow = window.open('', '_blank', 'width=210mm,height=297mm');
    
    if (printWindow) {
      printWindow.document.write(this.getFormHTML());
      printWindow.document.close();
      
      // Auto-trigger print dialog after content loads
      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.print();
          // Close window after print dialog is dismissed (optional)
          // printWindow.close();
        }, 1000);
      };
    }
  }

  private getFormHTML(): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Abad Alshams Kindergarten - Enrollment Form</title>
        <meta charset="utf-8">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: Arial, sans-serif; 
            font-size: 11px; 
            line-height: 1.2; 
            color: #000;
            background: white;
          }
          
          .page { 
            width: 210mm; 
            min-height: 297mm; 
            margin: 0 auto; 
            padding: 15mm; 
            background: white;
            page-break-after: always;
            page-break-inside: avoid;
            display: block;
            position: relative;
          }
          .page:last-child { page-break-after: auto; }
          
          .header { 
            text-align: center; 
            margin-bottom: 20px; 
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;
          }
          .logo-img {
            height: 60px;
            width: auto;
            object-fit: contain;
          }
          .school-name { 
            font-size: 16px; 
            font-weight: bold; 
            margin-bottom: 5px; 
            letter-spacing: 1px;
          }
          .form-title { 
            font-size: 14px; 
          }
          
          .section { 
            border: 2px solid #000; 
            margin-bottom: 15px; 
            page-break-inside: avoid;
          }
          .section-header { 
            background: #D8BFD8; 
            padding: 8px 12px; 
            text-align: center; 
            font-weight: bold; 
            font-size: 11px;
            border-bottom: 1px solid #000;
          }
          .section-content { 
            padding: 12px; 
          }
          
          .form-row { 
            display: flex; 
            margin-bottom: 8px; 
            align-items: center; 
          }
          .form-field { 
            flex: 1; 
            display: flex; 
            align-items: center; 
            margin-right: 15px; 
          }
          .form-field.full { 
            flex: 1 1 100%; 
            margin-right: 0; 
          }
          .form-field.half { 
            flex: 0 0 48%; 
          }
          
          .label { 
            margin-right: 8px; 
            font-size: 10px; 
            white-space: nowrap;
          }
          .input { 
            border: none; 
            border-bottom: 1px solid #000; 
            flex: 1; 
            min-height: 16px; 
            padding: 2px;
          }
          .textarea { 
            border: 2px solid #000; 
            width: 100%; 
            min-height: 50px; 
            padding: 4px;
          }
          .checkbox { 
            width: 10px; 
            height: 10px; 
            border: 1px solid #000; 
            margin-right: 4px; 
            display: inline-block;
          }
          
          .page-number { 
            text-align: center; 
            margin-top: 15px; 
            font-weight: bold; 
            font-size: 12px;
          }
          
          .parent-columns {
            display: flex;
            gap: 0;
          }
          .parent-column {
            flex: 1;
            border: 1px solid #000;
            padding: 10px;
          }
          .parent-column:first-child {
            border-right: none;
          }
          .parent-header {
            background: #D8BFD8;
            padding: 8px;
            margin: -10px -10px 10px -10px;
            text-align: center;
            font-weight: bold;
            font-size: 10px;
          }
          
          @media print {
            body { 
              margin: 0; 
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            .page { 
              width: 100%; 
              min-height: 100vh; 
              margin: 0; 
              padding: 15mm;
              page-break-after: always;
              page-break-inside: avoid;
              display: block;
            }
            .page:last-child { page-break-after: auto; }
            @page { 
              size: A4; 
              margin: 0; 
            }
            .section {
              page-break-inside: avoid;
            }
            .section-header {
              background: #D8BFD8 !important;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            .parent-header {
              background: #D8BFD8 !important;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
          }
        </style>
      </head>
      <body>
        ${this.getPage1()}
        ${this.getPage2()}
        ${this.getPage3()}
        ${this.getPage4()}
      </body>
      </html>
    `;
  }

  private getPage1(): string {
    return `
      <!-- Page 1 -->
      <div class="page">
        <div class="header">
          <img src="assets/logo.png" alt="Abad Alshams Logo" class="logo-img">
          <div class="form-title">ENROLMENT FORM</div>
        </div>
        
        <div class="section">
          <div class="section-header">CHILD'S PERSONAL INFORMATION</div>
          <div class="section-content">
            <div class="form-row">
              <div class="form-field full">
                <span class="label">Child Name:</span>
                <div class="input"></div>
              </div>
            </div>
            <div class="form-row">
              <div class="form-field full">
                <span class="label">Father's Name:</span>
                <div class="input"></div>
              </div>
            </div>
            <div class="form-row">
              <div class="form-field">
                <span class="label">Date of birth:</span>
                <div class="input" style="max-width: 80px;"></div>
              </div>
              <div class="form-field">
                <span class="label">Gender:</span>
                <div class="checkbox"></div><span style="margin-right: 8px; font-size: 10px;">Male</span>
                <div class="checkbox"></div><span style="font-size: 10px;">Female</span>
              </div>
            </div>
            <div class="form-row">
              <div class="form-field">
                <span class="label">Nationality:</span>
                <div class="input"></div>
              </div>
              <div class="form-field">
                <span class="label">Child CPR No.:</span>
                <div class="input"></div>
              </div>
            </div>
            <div class="form-row">
              <div class="form-field">
                <span class="label">Father's CPR:</span>
                <div class="input"></div>
              </div>
              <div class="form-field">
                <span class="label">Mother's CPR:</span>
                <div class="input"></div>
              </div>
            </div>
            <div class="form-row">
              <div class="form-field">
                <span class="label">Main language:</span>
                <div class="input"></div>
              </div>
              <div class="form-field">
                <span class="label">Other languages:</span>
                <div class="input"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="section">
          <div class="section-header">CHILD'S EATING DETAILS</div>
          <div class="section-content">
            <div class="form-row">
              <div class="form-field full">
                <span class="label">Is the child on any special diet?</span>
                <div class="checkbox"></div><span style="margin-right: 8px; font-size: 10px;">Yes</span>
                <div class="checkbox"></div><span style="font-size: 10px;">No. If yes, please provide detail below.</span>
              </div>
            </div>
            <div class="form-row">
              <div class="form-field full">
                <div class="textarea"></div>
              </div>
            </div>
            <div class="form-row">
              <div class="form-field full">
                <span class="label">Does your child have any food allergies?</span>
                <div class="checkbox"></div><span style="margin-right: 8px; font-size: 10px;">Yes</span>
                <div class="checkbox"></div><span style="font-size: 10px;">No. If yes, please write below.</span>
              </div>
            </div>
            <div class="form-row">
              <div class="form-field full">
                <div class="textarea"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="section">
          <div class="section-header">CHILD'S DEVELOPMENT DETAILS</div>
          <div class="section-content">
            <div class="form-row">
              <div class="form-field full">
                <span class="label">Do you have any concerns about your child's development?</span>
                <div class="checkbox"></div><span style="margin-right: 8px; font-size: 10px;">Yes</span>
                <div class="checkbox"></div><span style="font-size: 10px;">No</span>
              </div>
            </div>
            <div class="form-row" style="flex-wrap: wrap;">
              <div style="display: flex; align-items: center; margin-right: 15px;">
                <div class="checkbox"></div><span style="font-size: 10px;">Hearing</span>
              </div>
              <div style="display: flex; align-items: center; margin-right: 15px;">
                <div class="checkbox"></div><span style="font-size: 10px;">Vision</span>
              </div>
              <div style="display: flex; align-items: center; margin-right: 15px;">
                <div class="checkbox"></div><span style="font-size: 10px;">Language</span>
              </div>
              <div style="display: flex; align-items: center; margin-right: 15px;">
                <div class="checkbox"></div><span style="font-size: 10px;">Gross Motor</span>
              </div>
              <div style="display: flex; align-items: center; margin-right: 15px;">
                <div class="checkbox"></div><span style="font-size: 10px;">Fine Motor</span>
              </div>
              <div style="display: flex; align-items: center;">
                <div class="checkbox"></div><span style="font-size: 10px;">Social</span>
              </div>
            </div>
            <div class="form-row">
              <div class="form-field">
                <div class="checkbox"></div><span style="margin-right: 8px; font-size: 10px;">Other. Explain:</span>
                <div class="input"></div>
              </div>
            </div>
            <div class="form-row">
              <div class="form-field full">
                <span class="label">Has your child been in childcare before?</span>
                <div class="checkbox"></div><span style="margin-right: 8px; font-size: 10px;">Yes</span>
                <div class="checkbox"></div><span style="font-size: 10px;">No</span>
              </div>
            </div>
            <div class="form-row">
              <div class="form-field full">
                <span class="label">Is your child comfortable in group situations?</span>
                <div class="checkbox"></div><span style="margin-right: 8px; font-size: 10px;">Yes</span>
                <div class="checkbox"></div><span style="font-size: 10px;">No</span>
              </div>
            </div>
            <div class="form-row">
              <div class="form-field full">
                <span class="label">Is there anything we should know about your child's play with other children, by themselves, any concerns:</span>
                <div class="input"></div>
              </div>
            </div>
            <div class="form-row">
              <div class="form-field full">
                <span class="label">What kind of activities does your child enjoy?</span>
                <div class="input"></div>
              </div>
            </div>
            <div class="form-row">
              <div class="form-field full">
                <span class="label">Are there activities your child avoids?</span>
                <div class="input"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="page-number">Page 1</div>
      </div>
    `;
  }

  private getPage2(): string {
    return `
      <!-- Page 2 -->
      <div class="page">
        <div class="header">
          <img src="assets/logo.png" alt="Abad Alshams Logo" class="logo-img">
          <div class="form-title">ENROLMENT FORM</div>
        </div>
        
        <div class="section" style="border: 2px solid #000;">
          <div class="section-content">
            <div class="form-row">
              <div class="form-field full">
                <span class="label">How would you describe your child's temperament and personality?</span>
              </div>
            </div>
            <div class="form-row">
              <div class="form-field full">
                <div class="textarea"></div>
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-field full">
                <span class="label">Does your child have siblings?</span>
                <div class="checkbox"></div><span style="margin-right: 8px; font-size: 10px;">Yes</span>
                <div class="checkbox"></div><span style="font-size: 10px;">No. If yes, please list their names and ages below.</span>
              </div>
            </div>
            <div class="form-row">
              <div class="form-field full">
                <div class="textarea"></div>
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-field">
                <span class="label">Does your family have any pets?</span>
                <div class="checkbox"></div><span style="margin-right: 8px; font-size: 10px;">Yes</span>
                <div class="checkbox"></div><span style="margin-right: 8px; font-size: 10px;">No. If yes, pets name:</span>
                <div class="input" style="max-width: 150px;"></div>
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-field full">
                <span class="label">What soothes your child?</span>
              </div>
            </div>
            <div class="form-row">
              <div class="form-field full">
                <div class="textarea"></div>
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-field full" style="position: relative;">
                <span class="label">What frightens your child?</span>
                <span style="position: absolute; right: 0; font-size: 24px; font-weight: bold;">2</span>
              </div>
            </div>
            <div class="form-row">
              <div class="form-field full">
                <div class="textarea"></div>
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-field full">
                <span class="label">Does your child have any favorite songs or games that comfort them?</span>
                <div class="checkbox"></div><span style="margin-right: 8px; font-size: 10px;">Yes</span>
                <div class="checkbox"></div><span style="font-size: 10px;">No. If yes, explain</span>
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-field full">
                <span class="label">What are your expectations or hopes for your child at our School?</span>
              </div>
            </div>
            <div class="form-row">
              <div class="form-field full">
                <div class="textarea"></div>
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-field full">
                <span class="label">Do you allow us to provide food in the school?</span>
                <div class="checkbox"></div><span style="margin-right: 8px; font-size: 10px;">Yes</span>
                <div class="checkbox"></div><span style="font-size: 10px;">No. If yes, write below the food your child likes to eat at home.</span>
              </div>
            </div>
            <div class="form-row">
              <div class="form-field full">
                <div class="textarea"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="section">
          <div class="section-header">CHILD'S HEALTH DETAILS</div>
          <div class="section-content">
            <div class="form-row">
              <div class="form-field full">
                <span class="label">Has your child received all scheduled immunizations?</span>
                <div class="checkbox"></div><span style="margin-right: 8px; font-size: 10px;">Yes</span>
                <div class="checkbox"></div><span style="font-size: 10px;">No.</span>
              </div>
            </div>
            <div class="form-row">
              <div class="form-field full">
                <span style="font-size: 10px;">If no, your child will need to be excluded from the site during outbreaks of some infectious diseases.</span>
              </div>
            </div>
            <div class="form-row">
              <div class="form-field full">
                <span class="label">Does your child have a diagnosed medical condition that may require support?</span>
                <div class="checkbox"></div><span style="margin-right: 8px; font-size: 10px;">Yes</span>
                <div class="checkbox"></div><span style="font-size: 10px;">No.</span>
              </div>
            </div>
            <div class="form-row">
              <div class="form-field full">
                <span class="label">If yes, please explain.</span>
                <div class="input"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="page-number">Page 2</div>
      </div>
    `;
  }

  private getPage3(): string {
    return `
      <!-- Page 3 -->
      <div class="page">
        <div class="header">
          <img src="assets/logo.png" alt="Abad Alshams Logo" class="logo-img">
          <div class="form-title">ENROLMENT FORM</div>
        </div>
        
        <div class="section">
          <div class="section-header">PARENT/GUARDIAN DETAILS</div>
          <div class="section-content">
            <div class="parent-columns">
              <div class="parent-column">
                <div class="parent-header">
                  <div style="font-weight: bold;">PARENT 1/GUARDIAN 1 DETAILS</div>
                  <div style="font-size: 9px;">(Enrolling parent/guardian)</div>
                </div>
                <div class="form-row">
                  <div class="form-field full">
                    <span class="label">Mr./Mrs./Ms./Other:</span>
                    <div class="input"></div>
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-field full">
                    <span class="label">Relationship to child:</span>
                    <div class="input"></div>
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-field full">
                    <span class="label">CPR. NO:</span>
                    <div class="input"></div>
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-field full">
                    <span class="label">Mobile number:</span>
                    <div class="input"></div>
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-field full">
                    <span class="label">Nationality:</span>
                    <div class="input"></div>
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-field full">
                    <span class="label">Passport No.</span>
                    <div class="input"></div>
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-field full">
                    <span class="label">Email address:</span>
                    <div class="input"></div>
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-field full">
                    <span class="label">Signature of enrolling parent/guardian:</span>
                    <div class="input" style="min-height: 30px;"></div>
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-field full">
                    <span class="label">Date:</span>
                    <div class="input"></div>
                  </div>
                </div>
              </div>
              
              <div class="parent-column">
                <div class="parent-header">
                  <div style="font-weight: bold;">PARENT 2/GUARDIAN 2 DETAILS</div>
                </div>
                <div class="form-row">
                  <div class="form-field full">
                    <span class="label">Mr./Mrs./Ms./Other</span>
                    <div class="input"></div>
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-field full">
                    <span class="label">Relationship to child:</span>
                    <div class="input"></div>
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-field full">
                    <span class="label">CPR. NO:</span>
                    <div class="input"></div>
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-field full">
                    <span class="label">Mobile number:</span>
                    <div class="input"></div>
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-field full">
                    <span class="label">Nationality:</span>
                    <div class="input"></div>
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-field full">
                    <span class="label">Passport No.</span>
                    <div class="input"></div>
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-field full">
                    <span class="label">Email address:</span>
                    <div class="input"></div>
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-field full">
                    <span class="label">Signature of parent/ Guardian.</span>
                    <div class="input" style="min-height: 30px;"></div>
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-field full">
                    <span class="label">Date.</span>
                    <div class="input"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="section">
          <div class="section-header">ADDRESSES</div>
          <div class="section-content">
            <div class="form-row">
              <div class="form-field full">
                <span class="label">Mailing address:</span>
              </div>
            </div>
            <div class="form-row">
              <div class="form-field full">
                <div class="textarea" style="min-height: 80px;"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div style="position: relative;">
          <span style="position: absolute; right: 0; top: -20px; font-size: 24px; font-weight: bold;">3</span>
          <div class="page-number">Page 3</div>
        </div>
      </div>
    `;
  }

  private getPage4(): string {
    return `
      <!-- Page 4 -->
      <div class="page">
        <div class="header">
          <img src="assets/logo.png" alt="Abad Alshams Logo" class="logo-img">
          <div class="form-title">ENROLMENT FORM</div>
        </div>
        
        <div class="section">
          <div class="section-header">PERSONS AUTHORISED TO PICK THE CHILD</div>
          <div class="section-content">
            <div class="form-row">
              <div class="form-field half">
                <span class="label">Full Names:</span>
                <div class="input"></div>
              </div>
              <div class="form-field half">
                <span class="label">Work phone:</span>
                <div class="input"></div>
              </div>
            </div>
            <div class="form-row">
              <div class="form-field half">
                <span class="label">Relationship to child:</span>
                <div class="input"></div>
              </div>
              <div class="form-field half">
                <span class="label">Mobile phone:</span>
                <div class="input"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="section">
          <div class="section-header">EMERGENCY CONTACTS IF PARENTS/GUARDIANS CANNOT BE CONTACTED</div>
          <div class="section-content">
            <div class="form-row">
              <div class="form-field half">
                <span class="label">Full Names:</span>
                <div class="input"></div>
              </div>
              <div class="form-field half">
                <span class="label">Work phone:</span>
                <div class="input"></div>
              </div>
            </div>
            <div class="form-row">
              <div class="form-field half">
                <span class="label">Relationship to child:</span>
                <div class="input"></div>
              </div>
              <div class="form-field half">
                <span class="label">Mobile phone:</span>
                <div class="input"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="section">
          <div class="section-header">ANY OTHER INFORMATION/COMMENTS</div>
          <div class="section-content">
            <div class="form-row">
              <div class="form-field full">
                <span style="font-size: 10px;">I give permission for my child to be photographed. Photos may appear on the social media pages, Newsletter, posters, etc.</span>
              </div>
            </div>
            <div class="form-row">
              <div class="form-field full">
                <span style="font-size: 10px;">Sign .................................................... Date .................................</span>
              </div>
            </div>
            
            <div class="form-row" style="margin-top: 15px;">
              <div class="form-field full">
                <span style="font-size: 10px;">I give permission for my child to receive first aid in the case of an emergency and/or for them to be taken to the nearest hospital.</span>
              </div>
            </div>
            
            <div class="form-row" style="margin-top: 15px;">
              <div class="form-field full">
                <span style="font-size: 10px;">Administrative charges (including registration, books, and stationery fees) are <strong>non-refundable. 50% of the term fee</strong> will be refunded if parents notify the Kindergarten at least <strong>15 days prior to the start of classes</strong>. No refunds will be made once classes have commenced.</span>
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-field full">
                <span style="font-size: 10px;">Sign .................................................... Date .................................</span>
              </div>
            </div>
            
            <div class="form-row" style="margin-top: 15px;">
              <div class="form-field full">
                <span style="font-size: 10px;">Kindly submit the following documents along with filled application to complete the enrollment process.</span>
              </div>
            </div>
            
            <div style="margin-top: 10px;">
              <div style="display: flex; align-items: center; margin-bottom: 5px;">
                <span style="margin-right: 8px;">📋</span>
                <span style="font-size: 10px;">4 color photographs</span>
              </div>
              <div style="display: flex; align-items: center; margin-bottom: 5px;">
                <span style="margin-right: 8px;">📋</span>
                <span style="font-size: 10px;">Birth Certificate of the child.</span>
              </div>
              <div style="display: flex; align-items: center; margin-bottom: 5px;">
                <span style="margin-right: 8px;">📋</span>
                <span style="font-size: 10px;">Copies of CPR child, father, mother/guardian, or authorized persons.</span>
              </div>
              <div style="display: flex; align-items: center; margin-bottom: 5px;">
                <span style="margin-right: 8px;">📋</span>
                <span style="font-size: 10px;">Passport copies of child and his/her parents.</span>
              </div>
              <div style="display: flex; align-items: center; margin-bottom: 5px;">
                <span style="margin-right: 8px;">📋</span>
                <span style="font-size: 10px;">Educational documents in case on transferring from another school.</span>
              </div>
              <div style="display: flex; align-items: center; margin-bottom: 5px;">
                <span style="margin-right: 8px;">📋</span>
                <span style="font-size: 10px;">Health and immunization certificate.</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="page-number">Page 4</div>
      </div>
    `;
  }
}