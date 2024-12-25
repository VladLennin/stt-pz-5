describe('e2e test for calculator app', () => {
  let btn1, btn2, btn3, btn4, btn5, btn6, btn7, btn8, btn9, btn0;
  let btnPlus, btnMinus, btnEqual, btnMultiply, btnDivide, btnPercentages, btnPlusMinus, btnClr, btnDot, btnTheme, btnSave, btnPaste, dashboard;

  before(() => {
    cy.visit('http://localhost:3000/');
    // Initialize buttons
    btn1 = cy.get('[data-test="btn-1"]');
    btn2 = cy.get('[data-test="btn-2"]');
    btn3 = cy.get('[data-test="btn-3"]');
    btn4 = cy.get('[data-test="btn-4"]');
    btn5 = cy.get('[data-test="btn-5"]');
    btn6 = cy.get('[data-test="btn-6"]');
    btn7 = cy.get('[data-test="btn-7"]');
    btn8 = cy.get('[data-test="btn-8"]');
    btn9 = cy.get('[data-test="btn-9"]');
    btn0 = cy.get('[data-test="btn-0"]');
    btnPlus = cy.get('[data-test="btn-plus"]');
    btnMinus = cy.get('[data-test="btn-minus"]');
    btnEqual = cy.get('[data-test="btn-equal"]');
    btnMultiply = cy.get('[data-test="btn-multiply"]');
    btnDivide = cy.get('[data-test="btn-slash"]');
    btnPercentages = cy.get('[data-test="btn-percentages"]');
    btnPlusMinus = cy.get('[data-test="btn-plus-minus"]');
    btnClr = cy.get('[data-test="btn-clr"]');
    btnDot = cy.get('[data-test="btn-dot"]');
    btnTheme = cy.get('[data-test="btn-theme"]');
    btnSave = cy.get('[data-test="btn-save"]');
    btnPaste = cy.get('[data-test="btn-paste"]');
    dashboard = cy.get('[data-test="dashboard"]');
  });

  it('should check expression 2+9-6', () => {
    btn2.click();
    btnPlus.click();
    btn9.click();
    btnMinus.click();
    btn6.click();

    dashboard.invoke('val').then(val => {
      expect(val).to.equal('2+9-6');
    });
  });

  it('should check result of expression 2+9-6', () => {
    btnEqual.click();
    dashboard.invoke('val').then(val => {
      expect(val).to.equal('5');
    });
  });

  it('should check result of expression 1+2+3+4-5-6-7-8-9', () => {
    btn1.click();
    btnPlus.click();
    btn2.click();
    btnPlus.click();
    btn3.click();
    btnPlus.click();
    btn4.click();
    btnMinus.click();
    btn5.click();
    btnMinus.click();
    btn6.click();
    btnMinus.click();
    btn7.click();
    btnMinus.click();
    btn8.click();
    btnMinus.click();
    btn9.click();

    btnEqual.click();
    dashboard.invoke('val').then(val => {
      expect(val).to.equal('-25');
    });
  });

  it('should check result of expression 10/10', () => {
    btn1.click();
    btn0.click();
    btnDivide.click();
    btn1.click();
    btn0.click();

    btnEqual.click();
    dashboard.invoke('val').then(val => {
      expect(val).to.equal('1');
    });
  });

  it('should check result of expression 0.5*10', () => {
    btn0.click();
    btnDot.click();
    btn5.click();
    btnMultiply.click();
    btn1.click();
    btn0.click();

    btnEqual.click();
    dashboard.invoke('val').then(val => {
      expect(val).to.equal('5');
    });
  });

  it('should check result of expression -0.1*99', () => {
    btnPlusMinus.click();
    btn0.click();
    btnDot.click();
    btn1.click();
    btnMultiply.click();
    btn9.click();
    btn9.click();

    btnEqual.click();
    dashboard.invoke('val').then(val => {
      expect(val).to.equal('-9.9');
    });
  });

  it('should calculate 10 percent of 1,000', () => {
    btn1.click();
    btn0.click();
    btn0.click();
    btn0.click();
    btnPercentages.click();

    btnEqual.click();
    dashboard.invoke('val').then(val => {
      expect(val).to.equal('100');
    });
  });

  it('should check clear button', () => {
    btn1.click();
    btnPlus.click();
    btn2.click();
    btnClr.click();

    dashboard.invoke('val').then(val => {
      expect(val).to.equal('');
    });
  });

  it('should check paste button', () => {
    btnClr.click();
    btnPaste.click();

    dashboard.invoke('val').then(val => {
      expect(val).to.equal('3');
    });
  });

  // it('should check change theme, toggle theme button', () => {
  //   cy.window().then(win => {
  //     const currentTheme = win.localStorage.getItem('theme');
  //     btnTheme.click();
  //
  //     cy.wait(500).then(() => {
  //       const newTheme = win.localStorage.getItem('theme');
  //       expect(newTheme).to.not.equal(currentTheme);
  //     });
  //   });
  // });

  it('should check change theme, toggle theme button', () => {
    cy.window().then(win => {
      const currentTheme = win.localStorage.getItem('theme'); // Get the current theme from localStorage

      // Find the toggle theme button and click it
      cy.get('#btnTheme') // Make sure '#btnTheme' is the correct selector
        .should('exist') // Ensure the button exists in the DOM
        .click(); // Click the button

      // Wait for the theme to update in localStorage
      cy.wait(500).then(() => {
        const newTheme = win.localStorage.getItem('theme'); // Check the new theme
        expect(newTheme).to.not.equal(currentTheme); // Verify the theme changed
      });
    });
  });
});
