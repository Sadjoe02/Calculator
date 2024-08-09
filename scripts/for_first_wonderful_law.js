function check_First_Remarkable_Limit(expression) {
    // Разбираем выражение на sin и его знаменатель
    expression = Algebrite.simplify(expression).toString();
    let numerator = Algebrite.numerator(expression).toString();
    let denominator = Algebrite.denominator(expression).toString();

    let regex = /(\d*\s*\*?\s*)sin\(([^)]+)\)/;
    let matched = numerator.match(regex);
    if (!matched) {
        return { found: false, limit: null };
    }

    let exp, exp_siml;
    // Получаем аргументы синуса и знаменателя
    let sinCoefficient = matched[1].replace(/\s*\*\s*$/, '') || '1';
    let sinArgument = matched[2];

    let simplification = nerdamer(`divide(${sinArgument},${denominator})`).evaluate().toString();
    simplification = Algebrite.simplify(simplification).toString();
    numerator = Algebrite.numerator(simplification).toString();
    if (numerator === '1') {
        let flag = true;
        if (sinCoefficient === '1') {
            exp = `(sin(${sinArgument}))/(${denominator})`;
            exp_siml = `${simplification}`;
        }
        else {
            exp = `(${sinCoefficient}*sin(${sinArgument}))/(${denominator})`;
            exp_siml = `${sinCoefficient}*${simplification}`;
        }
        if (nerdamer(numerator).isNumber()) {
            regex = /(\d*\s*\*?\s*)sin\(([^)]+)\)\s*\/\s*(\([^)]*\)+|[^)\s]+)/;
            let updated_Expression = expression.replace(regex, exp_siml);
            return { found: true, limit: '1', exp, exp_siml, final: updated_Expression, flag };
        } else {
            return { found: false, limit: null };
        }
    } else {
        let flag = false;
        let numerator_dop = numerator;
        let exp_numerator = Algebrite.numerator(expression).toString();
        let exp_denominator = Algebrite.denominator(expression).toString();
        exp_numerator = `${numerator}*${exp_numerator}`;
        exp_denominator = `${numerator}*${exp_denominator}`;
        full_exp = `(${exp_numerator})/(${exp_denominator})`;
        let renderstep_1 = format_Formula_For_MathJax(exp_numerator);
        let renderstep_2 = format_Formula_For_MathJax(exp_denominator);
        let renderstep = `\\frac{${renderstep_1}}{${renderstep_2}}`;
        full_exp = Algebrite.run(full_exp).toString();
        numerator = Algebrite.numerator(full_exp).toString();
        denominator = Algebrite.denominator(full_exp).toString();
        matched = numerator.match(regex);
        if (!matched) {
            return { found: false, limit: null };
        }
        let theory = `<div> Но сперва необходимо коэффициент аргумента синуса, в данном случае это ${numerator_dop} умножить как на числитель, так и знаменатель. Из этого получим:</div>
        <span class="mathjax-text">\\[${renderstep}\\]</span>`;
        sinCoefficient = matched[1].replace(/\s*\*\s*$/, '') || '1';
        sinArgument = matched[2];
        simplification = nerdamer(`divide(${sinArgument},${denominator})`).evaluate().toString();
        simplification = Algebrite.simplify(simplification).toString();
        numerator = Algebrite.numerator(simplification).toString();
        if (sinCoefficient === '1') {
            exp = `(${numerator_dop}*sin(${sinArgument}))/(${numerator_dop}*${denominator})`;
            exp_siml = `${simplification}`;
        }
        else {
            exp = `(${sinCoefficient}*${numerator_dop}*sin(${sinArgument}))/(${numerator_dop}*${denominator})`;
            exp_siml = `${sinCoefficient}*${simplification}`;
        }

        if (nerdamer(numerator).isNumber()) {
            regex = /(\d*\s*\*?\s*)sin\(([^)]+)\)\s*\/\s*(?:\(([^)]+)\)|([^)\s]+))/;
            let updated_Expression = full_exp.replace(regex, exp_siml);
            return { found: true, limit: '1', exp, exp_siml, final: updated_Expression, flag, theory, renderstep };
        } else {
            return { found: false, limit: null };
        }
    }
}

const trigonometric_rules = `<br>Сначала вспомним, что же такое первый замечательный предел. Первый замечательный предел раскрывает неопределённость функции вида 0/0, если есть тригонометрические и обратнотригонометрические функции. Он имеет вид:
<span class="mathjax-text">\\[ \\lim_{{x \\to 0}}\\frac{\\sin(x)}{x}\\]</span>
<br>Также не стоит забывать об эквивалентных функциях:
<span class="mathjax-text">\\[\\sin(x){\\sim}x\\]</span>
<span class="mathjax-text">\\[\\tan(x){\\sim}x\\]</span>
<span class="mathjax-text">\\[\\arcsin(x){\\sim}x\\]</span>
<span class="mathjax-text">\\[\\arctan(x){\\sim}x\\]</span>
<span class="mathjax-text">\\[1-\\cos(x){\\sim}\\frac{x^2}{2}\\]</span>
<span class="mathjax-text">\\[e^x-1{\\sim}x\\]</span>
<span class="mathjax-text">\\[a^x-1{\\sim}x*\\ln(a)\\]</span>
<span class="mathjax-text">\\[\\ln(1+x){\\sim}x\\]</span>
<span class="mathjax-text">\\[(1+x)^a{\\sim}a*x\\]</span>
<span class="mathjax-text">\\[(1+x)^(\\frac{1}{n})-1{\\sim}\\frac{x}{n}\\]</span>
<br> Кроме этого, для решения таких пределов необходимо вспомнить такие тригонометрические формулы, как:
    <ul>
    <li>преобразование суммы и разности тригонометрических функций в произведение;</li>
    <li>тригонометрические функции одного угла;</li>
    <li>выражение тангенса через синус и косинус двойного угла;</li>
    <li>выражение тригонометрических функций через тангенс половинного угла;</li>
    <li>преобразование произведения тригонометрических функций в сумму;</li>
    <li>формулы двойного и тройного аргументов;</li>
    <li>формулы суммы и разности аргументов;</li>
    <li>основные тригонометрические тождества.</li>
    </ul>
    <br> К формулам преобразования суммы и разности тригонометрических функций в произведение относятся:
    <span class="mathjax-text">\\[\\sin(x){\\pm}\\sin(y)=2\\cdot\\sin(\\frac{x{\\pm}y}{2})\\cdot\\cos(\\frac{x{\\mp}y}{2})\\]</span>
    <span class="mathjax-text">\\[\\cos(x)+\\cos(y)=2\\cdot\\cos(\\frac{x+y}{2})\\cdot\\cos(\\frac{x-y}{2})\\]</span>
    <span class="mathjax-text">\\[\\cos(x)-\\cos(y)=2\\cdot\\sin(\\frac{x+y}{2})\\cdot\\sin(\\frac{y-x}{2})\\]</span>
    <br> К формулам тригонометрических функций одного угла относятся:
    <span class="mathjax-text">\\[\\operatorname{tg}(x)=\\frac{\\sin(x)}{\\cos(x)}, x{\\ne}\\frac{\\pi}{2}+\\pi n, n{\\in}Z\\]</span>
    <span class="mathjax-text">\\[\\operatorname{ctg}(x)=\\frac{\\cos(x)}{\\sin(x)}, x{\\ne}\\pi n, n{\\in}Z\\]</span>
    <span class="mathjax-text">\\[\\operatorname{tg}\\cdot\\operatorname{ctg}(x)=1, x{\\ne}\\frac{\\pi n}{2}, n{\\in}Z\\]</span>
    <span class="mathjax-text">\\[1+\\operatorname{tg}^2(x)=\\frac{1}{\\cos^2(x)},x{\\ne}\\frac{\\pi}{2}+\\pi n,n{\\in}Z\\]</span>
    <span class="mathjax-text">\\[1+\\operatorname{ctg}^2(x)=\\frac{1}{\\sin^2(x)},x{\\ne}\\pi n,n{\\in}Z\\]</span>
    <br> К формулам выражения тангенса через синус и косинус двойного угла относятся:
    <span class="mathjax-text">\\[\\operatorname{tg}(x)=\\frac{\\sin(2x)}{1+\\cos(2x)}=\\frac{1-\\cos(2x)}{\\sin(2x)}\\]</span>
    <br> К формулам выражения тригонометрических функций через тангенс половинного угла относятся:
    <span class="mathjax-text">\\[\\sin(x)=\\frac{2\\operatorname{tg}(\\frac{x}{2})}{1+\\operatorname{tg}^2(\\frac{x}{2})}, x{\\ne}(2n+1)\\pi,n{\\in}Z\\]</span>
    <span class="mathjax-text">\\[\\cos(x)=\\frac{1-\\operatorname{tg}^2(\\frac{x}{2})}{1+\\operatorname{tg}^2(\\frac{x}{2})}, x{\\ne}(2n+1)\\pi,n{\\in}Z\\]</span>
    <span class="mathjax-text">\\[\\operatorname{tg}(x)=\\frac{2\\operatorname{tg} (\\frac{x}{2})}{1-\\operatorname{tg}^2(\\frac{x}{2})}, x{\\ne}(2n+1)\pi,n{\\in}Z\\]</span>
    <br> К формулам преобразования произведения тригонометрических функций в сумму относятся:
    <span class="mathjax-text">\\[\\sin(x)\\cdot\\sin(y)=\\frac{1}{2}(\\cos(x-y)-\\cos(x+y))\\]</span>
    <span class="mathjax-text">\\[\\cos(x)\\cdot\\cos(y)=\\frac{1}{2}(\\cos(x-y)+\\cos(x+y))\\]</span>
    <span class="mathjax-text">\\[\\sin(x)\\cdot\\cos(y)=\\frac{1}{2}(\\sin(x-y)+\\sin(x+y))\\]</span>
    <br> К формулам двойного и тройного аргументов относятся:
    <span class="mathjax-text">\\[\\cos(2x)=\\cos^2(x)-\\sin^2(x)=1-2\\sin^2(x)=2\\cos^2(x)-1\\]</span>
    <span class="mathjax-text">\\[\\sin(2x)=2\\sin(x)\\cdot\\cos(x)\\]</span>
    <span class="mathjax-text">\\[\\sin^2(x)=\\frac{1-\\cos(2x)}{2}\\]</span>
    <span class="mathjax-text">\\[\\cos^2(x)=\\frac{1+\\cos(2x)}{2}\\]</span>
    <span class="mathjax-text">\\[\\sin(3x)=3\\sin(x)-4\\sin^3(x)\\]</span>
    <span class="mathjax-text">\\[\\cos(3x)=4\\cos^3(x)-3\\cos(x)\\]</span>
    <span class="mathjax-text">\\[\\operatorname{tg}(2x)=\\frac{2\\operatorname{tg}(x)}{1-\\operatorname{tg}^2(x)}\\]</span>
    <span class="mathjax-text">\\[\\operatorname{tg}(3x)=\\frac{3\\operatorname{tg}(x)-\\operatorname{tg}^3(x)}{1-3\\operatorname{tg}^2(x)}\\]</span>
    <br> К формулам суммы и разности аргументов относятся:
    <span class="mathjax-text">\\[\\sin(x{\\pm}y)=\\sin(x)\\cdot\\cos(y){\\pm}\\cos(x)\\cdot\\sin(y)\\]</span>
    <span class="mathjax-text">\\[\\cos(x{\\pm}y)=\\cos(x)\\cdot\\cos(y){\\mp}\\sin(x)\\cdot\\sin(y)\\]</span>
    <span class="mathjax-text">\\[\\operatorname{tg}(x{\\pm}y)=\\frac{\\operatorname{tg}(x){\\pm}\\operatorname{tg}(y)}{1{\\mp}\\operatorname{tg}(x)\\cdot\\operatorname{tg}(y)}\\]</span>
    <br> К формулам основных тригонометрических тождеств относятся:
    <span class="mathjax-text">\\[\\sin^2(x)+\\cos^2(x)=1\\]</span>
    <span class="mathjax-text">\\[\\operatorname{tg}(x)\\cdot\\operatorname{ctg}(x)=1\\]</span>
    <span class="mathjax-text">\\[1+\\operatorname{tg}^2(x)=\\frac{1}{\\cos^2(x)}\\]</span>
    <span class="mathjax-text">\\[1+\\operatorname{ctg}^2(x)=\\frac{1}{\\sin^2(x)}\\]</span>
    `;


function simplifyExpression_basic_dop_for_wond_law(expr) {
    let simplified_Expr, factorized_Expr;
    let factorized_Numerator_final, factorized_Denominator_final;

    // Создаём объект выражения с помощью Nerdamer
    let expressionObj = nerdamer(expr);
    let evaluatedString = expressionObj.evaluate().toString();

    // Проверяем, является ли строковое представление числом
    if (!isNaN(parseFloat(evaluatedString)) && isFinite(evaluatedString)) {
        checking_for_number = true;
        return {
            evaluatedString: evaluatedString,
            checking_for_number: checking_for_number
        };
    } else {
        checking_for_number = false;
        // Проверяем, является ли введённое выражение дробью
        let numerator = expressionObj.numerator().toString();
        let denominator = expressionObj.denominator().toString();

        if (numerator !== expr && denominator !== '1') {
            checking_for_fractions = true;
            // Если выражение - дробь, применяем factor отдельно к числителю и знаменателю
            let new_Numerator = nerdamer('factor(' + numerator + ')').toString();
            let new_Denominator = nerdamer('factor(' + denominator + ')').toString();

            if (new_Numerator == numerator) {
                factorized_Numerator_final = numerator;
                changing_numerator = false;
            } else {
                factorized_Numerator_final = new_Numerator;
                changing_numerator = true;
            }

            if (new_Denominator == denominator) {
                factorized_Denominator_final = denominator;
                changing_denominator = false;
            } else {
                factorized_Denominator_final = new_Denominator;
                changing_denominator = true;
            }

            factorized_Expr = `(${factorized_Numerator_final})/(${factorized_Denominator_final})`;
        } else {
            // Если выражение не дробь, применяем factor к целому выражению
            let nerdamer_Simplified_Expr = nerdamer('simplify(' + expressionObj + ')').toString();

            factorized_Expr = nerdamer('factor(' + nerdamer_Simplified_Expr + ')').toString();
            checking_for_fractions = false;
            if (factorized_Expr == expr) {
                factorized_Expr = expr;
                changing_exp = false;
            }
            else {
                changing_exp = true;
            }
        }

        let nerdamer_Simplified_Expr = nerdamer('simplify(' + factorized_Expr + ')').toString();
      
        nerdamer_Simplified_Expr = nerdamer_Simplified_Expr !== factorized_Expr ? nerdamer_Simplified_Expr : factorized_Expr;

        let algebrite_Simplified_Expr = Algebrite.simplify(nerdamer_Simplified_Expr).toString();

       
        if (algebrite_Simplified_Expr !== nerdamer_Simplified_Expr) {
            changing_exp_2 = true;
            simplified_Expr = algebrite_Simplified_Expr; 
        } else {
            changing_exp_2 = false;
            simplified_Expr = nerdamer_Simplified_Expr;
        }

        return {
            factorizedNumeratorMsg: factorized_Numerator_final, 
            factorizedDenominatorMsg: factorized_Denominator_final, 
            factorizedExpr: factorized_Expr,
            simplifiedExpr: simplified_Expr, 
            changing_numerator: changing_numerator,
            changing_denominator: changing_denominator,
            changing_exp: changing_exp,
            changing_exp_2: changing_exp_2,
            checking_for_fractions: checking_for_fractions,
            numerator: numerator,
            denominator: denominator,
            checking_for_number: checking_for_number,
        };
    }
}

function contains_Trigonometric_Function(expression) {
    const trigRegex = /\b(sin|cos|tan|cot)\b/;
    let availability_trig_func = trigRegex.test(expression); 
    return availability_trig_func;
}

function analyze_Expression(expression) {
    let highestPriorityMatch = null;
    let theory = "";
    const patterns = [
        {
            regex: /tan\(([^)]+)\)/,
            priority: 3,
            replace: (matches) => `sin(${matches[1]})/cos(${matches[1]})`,
            theory: `<div>Как известно:</div> 
            <span class="mathjax-text">\\[\\tan(x)=\\frac{\\sin(x)}{\\cos(x)}\\]</span>`
        },
        {
            regex: /cot\(([^)]+)\)/,
            priority: 3,
            replace: (matches) => `cos(${matches[1]})/sin(${matches[1]})`,
            theory: `<div>Как известно:</div> 
            <span class="mathjax-text">\\[\\cot(x)=\\frac{\\cos(x)}{\\sin(x)}\\]</span>`
        },
        {
            regex: /sin\(([^)]+)\)\s*\+\s*sin\(([^)]+)\)/,
            priority: 2,
            replace: (matches) => `2*sin((${matches[1]}+${matches[2]})/2)*cos((${matches[1]}-${matches[2]})/2)`,
            theory: `<div>Как известно:</div> 
            <span class="mathjax-text">\\[\\sin(x)+\\sin(y)=2\\cdot\\sin(\\frac{x+y}{2})\\cdot\\cos(\\frac{x-y}{2})\\]</span>`
        },
        {
            regex: /sin\(([^)]+)\)\s*\-\s*sin\(([^)]+)\)/,
            priority: 2,
            replace: (matches) => `2*sin((${matches[1]}-${matches[2]})/2)*cos((${matches[1]}+${matches[2]})/2)`,
            theory: `<div>Как известно:</div> 
            <span class="mathjax-text">\\[\\sin(x)-\\sin(y)=2\\cdot\\sin(\\frac{x-y}{2})\\cdot\\cos(\\frac{x+y}{2})\\]</span>`
        },
        {
            regex: /cos\(([^)]+)\)\s*\+\s*cos\(([^)]+)\)/,
            priority: 2,
            replace: (matches) => `2*cos((${matches[1]}+${matches[2]})/2)*cos((${matches[1]}-${matches[2]})/2)`,
            theory: `<div>Как известно:</div> 
            <span class="mathjax-text">\\[\\cos(x)+\\cos(y)=2\\cdot\\cos(\\frac{x+y}{2})\\cdot\\cos(\\frac{x-y}{2})\\]</span>`
        },
        {
            regex: /cos\(([^)]+)\)\s*-\s*cos\(([^)]+)\)/,
            priority: 2,
            replace: (matches) => `2*sin((${matches[1]}+${matches[2]})/2)*sin((${matches[2]}-${matches[1]})/2)`,
            theory: `<div>Как известно:</div> 
            <span class="mathjax-text">\\[\\cos(x)-\\cos(y)=2\\cdot\\sin(\\frac{x+y}{2})\\cdot\\sin(\\frac{y-x}{2})\\]</span>`
        },
       
        {
            regex: /tan\(([^)]+)\)\s*\+\s*tan\(([^)]+)\)/,
            priority: 2,
            replace: (matches) => `(sin(${matches[1]}+${matches[2]}))/(cos(${matches[1]})*cos(${matches[2]}))`,
            theory: `<div>Как известно:</div> 
            <span class="mathjax-text">\\[\\tan(x)+\\tan(y)=\\frac{\\sin(x+y)}{\\cos(x)\\cdot\\cos(y)}</span>`
        },
        {
            regex: /tan\(([^)]+)\)\s*-\s*tan\(([^)]+)\)/,
            priority: 2,
            replace: (matches) => `(sin(${matches[1]}-${matches[2]}))/(cos(${matches[1]})*cos(${matches[2]}))`,
            theory: `<div>Как известно:</div> 
            <span class="mathjax-text">\\[\\tan(x)-\\tan(y)=\\frac{\\sin(x-y)}{\\cos(x)\\cdot\\cos(y)}</span>`
        },
        {
            regex: /(\d*\s*\*?\s*)?(sin|cos)\((.*?)\)\s*\*\s*(\d*\s*\*?\s*)(cos|sin)\((.*?)\)/,
            priority: 2,
            replace: (matches) => `${matches[1]}${matches[4]}(1/2)*(sin(${matches[3]}-${matches[6]})+sin(${matches[3]}+${matches[6]}))`,
            theory: `<div>Как известно:</div> 
            <span class="mathjax-text">\\[\\sin(x)\\cdot\\cos(y)=\\frac{1}{2}(\\sin(x-y)+\\sin(x+y))\\]</span>`
        },
        {
            regex: /(\d*\s*\*?\s*)?sin\((.*?)\)\s*\*\s*(\d*\s*\*?\s*)?sin\((.*?)\)/,
            priority: 2,
            replace: (matches) => `${matches[1]}${matches[3]}(1/2)*(cos(${matches[2]}-${matches[4]})-cos(${matches[2]}+${matches[4]}))`,
            theory: `<div>Как известно:</div> 
            <span class="mathjax-text">\\[\\sin(x)\\cdot\\sin(y)=\\frac{1}{2}(\\cos(x-y)-\\cos(x+y))\\]</span>`
        },
        {
            regex: /(\d*\s*\*?\s*)?cos\((.*?)\)\s*\*\s*(\d*\s*\*?\s*)?cos\((.*?)\)/,
            priority: 2,
            replace: (matches) => `${matches[1]}${matches[3]}(1/2)*(cos(${matches[2]}-${matches[4]})+cos(${matches[2]}+${matches[4]}))`,
            theory: `<div>Как известно:</div> 
            <span class="mathjax-text">\\[\\cos(x)\\cdot\\cos(y)=\\frac{1}{2}(\\cos(x-y)+\\cos(x+y))\\]</span>`
        },
        {
           
            regex: /sin\((\d+)\s*\*\s*([^)]+)\)/,
            priority: 1,
            replace: (matches) => `3*sin((${matches[1]}*${matches[2]})/3)-4*sin((${matches[1]}*${matches[2]})/3)^3`,
            testModulo: 3,
            theory: `<div>Как известно:</div> 
            <span class="mathjax-text">\\[\\sin(3x)=3\\sin(x)-4\\sin^3(x)\\]</span>`
        },
        {
            regex: /cos\((\d+)\s*\*\s*([^)]+)\)/,
            priority: 1,
            replace: (matches) => `4*cos((${matches[1]}*${matches[2]})/3)^3-3*cos((${matches[1]}*${matches[2]})/3)`,
            testModulo: 3,
            theory: `<div>Как известно:</div> 
            <span class="mathjax-text">\\[\\cos(3x)=4\\cos^3(x)-3\\cos(x)\\]</span>`
        },
        {
            regex: /tan\((\d+)\s*\*\s*([^)]+)\)/,
            priority: 1,
            replace: (matches) => `(3tan((${matches[1]}*${matches[2]})/3)-tan((${matches[1]}*${matches[2]})/3)^3)/(1-3*tan((${matches[1]}*${matches[2]})/3)^2)`,
            testModulo: 3,
            theory: `<div>Как известно:</div> 
            <span class="mathjax-text">\\[\\operatorname{tg}(3x)=\\frac{3\\operatorname{tg}(x)-\\operatorname{tg}^3(x)}{1-3\\operatorname{tg}^2(x)}\\]</span>`
        },
        {
            regex: /sin\((\d*[02468])\s*\*\s*([^)]+)\)/,
            priority: 1,
            replace: (matches) => `2*sin((${matches[1]}*${matches[2]})/2)*cos((${matches[1]}*${matches[2]})/2)`,
            theory: `<div>Как известно:</div> 
            <span class="mathjax-text">\\[\\sin(2x)=2\\sin(x)\\cdot\\cos(x)\\]</span>`
        },
        {
            regex: /cos\((\d*[02468])\s*\*\s*([^)]+)\)/,
            priority: 1,
            replace: (matches) => `1-2*sin((${matches[1]}*${matches[2]})/2)^2`,
            theory: `<div>Как известно:</div> 
            <span class="mathjax-text">\\[\\cos(2x)=\\cos^2(x)-\\sin^2(x)=1-2\\sin^2(x)=2\\cos^2(x)-1\\]</span>`
        },
        {
            regex: /tan\((\d*[02468])\s*\*\s*([^)]+)\)/,
            priority: 1,
            replace: (matches) => `(2*tan((${matches[1]}*${matches[2]})/2))/(1-tan((${matches[1]}*${matches[2]})/2)^2)`,
            theory: `<div>Как известно:</div> 
            <span class="mathjax-text">\\[\\operatorname{tg}(2x)=\\frac{2\\operatorname{tg}(x)}{1-\\operatorname{tg}^2(x)}\\]</span>`
        },
        {
            regex: /1\s*\+\s*tan\^2\(([^)]+)\)/,
            priority: 2,
            replace: (matches) => `1/cos(${matches[1]})^2`,
            theory: `<div>Как известно:</div> 
            <span class="mathjax-text">\\[1+\\operatorname{tg}^2(x)=\\frac{1}{\\cos^2(x)},x{\\ne}\\frac{\\pi}{2}+\\pi n,n{\\in}Z\\]</span>`
        },
        {
            regex: /1\s*\+\s*cot\^2\(([^)]+)\)/,
            priority: 2,
            replace: (matches) => `1/sin(${matches[1]})^2`,
            theory: `<div>Как известно:</div> 
            <span class="mathjax-text">\\[1+\\operatorname{ctg}^2(x)=\\frac{1}{\\sin^2(x)},x{\\ne}\\pi n,n{\\in}Z\\]</span>`
        },
        {
            regex: /sin\^2\((\d*x)\)/,
            priority: 3,
            replace: (matches) => `sin(${matches[1]})*sin(${matches[1]})`,
            theory: `<div>Разложим синус как:</div> 
            <span class="mathjax-text">\\[\\sin^2(x)=sin(x)*sin(x)\\]</span>`
        },
        {
            regex: /cos\^2\((\d*x)\)/,
            priority: 2,
            replace: (matches) => `(1+cos(2*${matches[1]}))/2`,
            theory: `<div>Как известно:</div> 
            <span class="mathjax-text">\\[\\cos^2(x)=\\frac{1+\\cos(2x)}{2}\\]</span>`
        },
        {
            regex: /(\b|\*|\+|-|\/|\(|^)(1\s*-\s*cos\(([^)]+)\))/,
            priority: 3,
            replace: (matches) => `${matches[1]}2*sin((${matches[3]})/2)*sin((${matches[3]})/2)`,
            theory: `<div>Исходя из свойства:</div> 
            <span class="mathjax-text">\\[\\sin^2(x)=\\frac{1-\\cos(2x)}{2}\\]</span>`
        },
        {
            regex: /sin\(([^)]+)\s*\+\s*([^)]+)\)/,
            priority: 2,
            replace: (matches) => `sin(${matches[1]})*cos(${matches[2]})+cos(${matches[1]})*sin(${matches[2]})`,
            theory: `<div>Исходя из свойства:</div> 
            <span class="mathjax-text">\\[\\sin(x+y)=\\sin(x)\\cdot\\cos(y)+\\cos(x)\\cdot\\sin(y)\\]</span>`
        },
        {
            regex: /sin\(([^)]+)\s*-\s*([^)]+)\)/,
            priority: 2,
            replace: (matches) => `sin(${matches[1]})*cos(${matches[2]})-cos(${matches[1]})*sin(${matches[2]})`,
            theory: `<div>Исходя из свойства:</div> 
            <span class="mathjax-text">\\[\\sin(x-y)=\\sin(x)\\cdot\\cos(y)-\\cos(x)\\cdot\\sin(y)\\]</span>`
        },
        {
            regex: /cos\(([^)]+)\s*\+\s*([^)]+)\)/,
            priority: 2,
            replace: (matches) => `cos(${matches[1]})*cos(${matches[2]})-sin(${matches[1]})*sin(${matches[2]})`,
            theory: `<div>Исходя из свойства:</div> 
            <span class="mathjax-text">\\[\\cos(x+y)=\\cos(x)\\cdot\\cos(y)-\\sin(x)\\cdot\\sin(y)\\]</span>`
        },
        {
            regex: /cos\(([^)]+)\s*-\s*([^)]+)\)/,
            priority: 2,
            replace: (matches) => `cos(${matches[1]})*cos(${matches[2]})+sin(${matches[1]})*sin(${matches[2]})`,
            theory: `<div>Исходя из свойства:</div> 
            <span class="mathjax-text">\\[\\cos(x-y)=\\cos(x)\\cdot\\cos(y)+\\sin(x)\\cdot\\sin(y)\\]</span>`
        },
        {
            regex: /tan\(([^)]+)\s*\+\s*([^)]+)\)/,
            priority: 2,
            replace: (matches) => `(tan(${matches[1]})+tan(${matches[2]}))/(1-tan(${matches[1]})*tan(${matches[2]}))`,
            theory: `<div>Исходя из свойства:</div> 
            <span class="mathjax-text">\\[\\operatorname{tg}(x+y)=\\frac{\\operatorname{tg}(x)+\\operatorname{tg}(y)}{1-\\operatorname{tg}(x)\\cdot\\operatorname{tg}(y)}\\]</span>`
        },
        {
            regex: /tan\(([^)]+)\s*-\s*([^)]+)\)/,
            priority: 2,
            replace: (matches) => `(tan(${matches[1]}) - tan(${matches[2]})) / (1 + tan(${matches[1]})*tan(${matches[2]}))`,
            theory: `<div>Исходя из свойства:</div> 
            <span class="mathjax-text">\\[\\operatorname{tg}(x-y)=\\frac{\\operatorname{tg}(x)-\\operatorname{tg}(y)}{1+\\operatorname{tg}(x)\\cdot\\operatorname{tg}(y)}\\]</span>`
        }
    ];

    patterns.forEach(pattern => {
        const match = expression.match(pattern.regex);
        if (match) {
            let validMatch = true;
            if (pattern.testModulo && !(parseInt(match[1]) % pattern.testModulo === 0)) {
                validMatch = false; 
            }
            if (validMatch && (!highestPriorityMatch || pattern.priority > highestPriorityMatch.priority)) {
                const replacement = pattern.replace(match);
                highestPriorityMatch = {
                    match: match,
                    pattern: pattern,
                    matchedExpression: match[0], 
                    replacementExpression: replacement,
                    theory: pattern.theory
                };
                theory = pattern.theory; 
            }
        }
    });

    if (highestPriorityMatch) {
        const { matchedExpression, replacementExpression, theory } = highestPriorityMatch;
        const updatedExpression = expression.replace(highestPriorityMatch.pattern.regex, highestPriorityMatch.replacementExpression);
        return {
            found: true,
            updatedExpression: updatedExpression,
            expression_found: matchedExpression,
            replacement_Expression: replacementExpression,
            theory: theory,
            priority: highestPriorityMatch.pattern.priority
        };
    } else {
        return { found: false, updatedExpression: expression, expression_found: "", replacement_Expression: "", theory: "Не найдено совпадений." };
    }
}


function replaceEquivalentFunctions(expression) {
    const patterns = [
        { regex: /(\*|\/|^|\s)tan\(([^)]+)\)(\*|\/|\s|$)/g, replaceWith: '$1($2)$3' },
        { regex: /(\*|\/|^|\s)arcsin\(([^)]+)\)(\*|\/|\s|$)/g, replaceWith: '$1($2)$3' },
        { regex: /(\*|\/|^|\s)arctan\(([^)]+)\)(\*|\/|\s|$)/g, replaceWith: '$1($2)$3' },
        { regex: /(1-cos\(([^)]+)\))/g, replaceWith: '($2^2/2)' },
        { regex: /(\*|\/|^|\s)e\^\(([^)]+)\)-1(\*|\/|\s|$)/g, replaceWith: '$1($2)$3' },
        { regex: /(\*|\/|^|\s)a\^\(([^)]+)\)-1(\*|\/|\s|$)/g, replaceWith: '$1($2*ln(a))$3' },
        { regex: /(\*|\/|^|\s)ln\(1\+([^)]+)\)(\*|\/|\s|$)/g, replaceWith: '$1($2)$3' },
        { regex: /(\*|\/|^|\s)\(1\+([^)]+)\)\^([^)]+)-1(\*|\/|\s|$)/g, replaceWith: '$1($2*$3)$4' } 
    ];

    let updatedExpression = expression;
    let changeMade = false;

    for (let pattern of patterns) {
        const testMatch = updatedExpression.match(pattern.regex);
        if (testMatch) {
            updatedExpression = updatedExpression.replace(pattern.regex, pattern.replaceWith);
            changeMade = true;
            break;  
        }
    }

    return { updatedExpression, changeMade };
}


function createsolution_Steps_HTML_for_first_remarkable_limit(formula, value_x, user_Formula, limitTo) {
    if (value_x === '0') {
        user_Formula = math.parse(user_Formula);
        user_Formula = user_Formula.toString();
        user_Formula = user_Formula.replace(/\s+/g, '');
        let html = '';
        var simplified_formula = user_Formula;
        let complete_non_simplified_expression, complete_simplified_expression;
        let renderedStep, decomposed_numerator, decomposed_denominator, example_changed, final_simplification, expression_with_fraction_numerator, expression_with_fraction_denominator;
        var result, simplificationSteps_intermediate;
        let check_wonderful_limit, numerator, denominator;
        var simplificationSteps = simplifyExpression_basic_dop_for_wond_law(user_Formula);
        numerator = simplificationSteps.numerator;
        denominator = simplificationSteps.denominator;
        let proverka1 = contains_Trigonometric_Function(numerator);
        let proverka2 = contains_Trigonometric_Function(denominator);
        if (simplificationSteps.checking_for_number) {
            html = `<div>При упрощении данного предела можно сразу получить ответ:</div>`;
            html += `<div class="mathjax-text">\\[
            \\lim_{{x \\to ${limitTo}}} ${formula} = \\lim_{{x \\to ${limitTo}}} ${simplificationSteps.evaluatedString} \\]</div>
            <div>Как извествено, предел const = const:</div>
        <div class="mathjax-text">\\[
            \\lim_{{\\begin{matrix} x \\to x_0 \\\\ x \\to {\\infty} \\end{matrix}}} C = C\\]
            </div>
        <div>Отсюда имеем:</div>
        <div class="mathjax-text">\\[
            \\lim_{{x \\to ${value_x}}} ${simplificationSteps.evaluatedString} = ${simplificationSteps.evaluatedString}\\]
            </div>`;
            return html;
        } else {
            if (!simplificationSteps.checking_for_fractions) {
                html = `<div>Вы неверно определили тип предела, пожалуйста, будьте внимательнее.</div>`;
            } else if (!proverka1 && !proverka2) {
                html = `<div>Вы неверно определили тип предела, пожалуйста, будьте внимательнее.</div>`;
            } else {
                //Вычисленные числитель и знаменатель
                let calculated_numerator = calculate_Limit(simplificationSteps.numerator, value_x).decimal;
                let calculated_denominator = calculate_Limit(simplificationSteps.denominator, value_x).decimal;

                //Подставлено в числитель и знаменатель
                let substituted_into_numerator = substituteX(simplificationSteps.numerator, value_x);
                let substituted_into_denominator = substituteX(simplificationSteps.denominator, value_x);
                //Обработанные числитель и знаменатель
                let render_numerator = format_Formula_For_MathJax(simplificationSteps.numerator);
                let render_denominator = format_Formula_For_MathJax(simplificationSteps.denominator);
                //Обработанные подставленные в числитель и знаменатель
                let render_substituted_into_numerator = format_Formula_For_MathJax(substituted_into_numerator);
                let render_substituted_into_denominator = format_Formula_For_MathJax(substituted_into_denominator);

                html = `
                <div>Первым шагом при вычислении такого вида пределов следует проверить, существуют ли неопределённости вида 0/0 или ∞/∞. Для этого необходимо подставить значение \( x = ${value_x} \) в функцию 
                <span class="mathjax-text">\\[f(x) = ${formula}\\]</span>Проверим существование неопределённости:</div>
                <div class="mathjax-text">\\[
                \\lim_{{x \\to ${limitTo}}} ${formula} = \\lim_{{x \\to ${limitTo}}} \\frac{${render_numerator}}{${render_denominator}} = 
                \\lim_{{x \\to ${limitTo}}} \\frac{${render_substituted_into_numerator}}{${render_substituted_into_denominator}} =
                \\lim_{{x \\to ${limitTo}}} \\frac{${calculated_numerator}}{${calculated_denominator}}\\]
                 </div>`;
                if (calculated_numerator === '∞' && calculated_denominator === '∞') {
                    html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел, т.к. первый замечательный предел раскрывает неопределённости вида 0/0.</div>`;
                    return html;
                } else if (calculated_numerator === '-∞' && calculated_denominator === '-∞') {
                    html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел, т.к. первый замечательный предел раскрывает неопределённости вида 0/0.</div>`;
                    return html;
                } else if (calculated_numerator === '0' && calculated_denominator === '0') {
                    html += `Данный предел относится к одному из основных видов неопределённостей: 0/0.`;
                } else {
                    html += `<div><b>Неопределённости в данном пределе нет.</b></div><div>Попробуем упростить числитель исходного выражения.<p align="center"><b>Начало теоретического материала</b></p><br>${trigonometric_rules}           
                    <br><p align="center"><b>Конец теоретического материала</b></p><br>Приступим к упрощению числителя: </div>`;
                    result = calculate_Limit(user_Formula, value_x);
                    let intermediate_formula = substituteX(user_Formula, value_x);
                    renderedStep = format_Formula_For_MathJax(intermediate_formula);
                    html += `
                    <div>После упрощения подставим значение \( x = ${value_x} \):</div>
                    <div class="mathjax-text">\\[
                    \\lim_{{x \\to ${limitTo}}} ${renderedStep}=\\lim_{{x \\to ${limitTo}}} ${result.decimal}\\]
                    </div>
                    <div>Как извествено, предел const = const:</div>
                    <div class="mathjax-text">\\[
                    \\lim_{{\\begin{matrix} x \\to x_0 \\\\ x \\to {\\infty} \\end{matrix}}} C = C\\]
                    </div>
                    <div>Отсюда имеем:</div>
                    <div class="mathjax-text">\\[
                    \\lim_{{x \\to ${limitTo}}} ${result.decimal} = ${result.decimal}\\]
                    </div>
                    <div>Результат в виде обычной дроби: <span class="mathjax-text">\\[${result.fraction}\\]</span></div>
                    <div>Результат в виде десятичной дроби: <span class="mathjax-text">\\[${result.decimal}\\]</span></div>`;
                    return html;
                }
                numerator = Algebrite.numerator(user_Formula).toString();
                denominator = Algebrite.denominator(user_Formula).toString();
                if (!proverka1) {
                    numerator = nerdamer('factor(' + numerator + ')').toString();
                } else if (!proverka2) {
                    denominator = nerdamer('factor(' + denominator + ')').toString();
                }
                html += `<div><p align="center"><b>Начало теоретического материала</b></p>${trigonometric_rules}           
                <br><p align="center"><b>Конец теоретического материала</b></p></div>`;
                check_wonderful_limit = check_First_Remarkable_Limit(user_Formula);
                if (check_wonderful_limit.found) {
                    if (check_wonderful_limit.flag) {
                        renderedStep = format_Formula_For_MathJax(check_wonderful_limit.exp);
                        let renderstep_2 = format_Formula_For_MathJax(check_wonderful_limit.exp_siml);
                        html += `<div>В данном пределе уже можно применить первый замечательный предел, т.к имеется выражение:</div>
                        <span class="mathjax-text">\\[${renderedStep}\\]</span>
                        <div>По первому замечательному пределу имеем:</div>
                        <span class="mathjax-text">\\[${renderedStep} = ${renderstep_2}\\]</span>
                        <div>Тогда пределел примет вид:</div>`;
                        renderedStep = format_Formula_For_MathJax(user_Formula);
                        renderstep_2 = format_Formula_For_MathJax(check_wonderful_limit.final);
                        html += `<div><span class="mathjax-text">\\[\\lim_{{x \\to ${limitTo}}} ${renderedStep}=\\lim_{{x \\to ${limitTo}}} ${renderstep_2}\\]</span>`;
                        result = calculate_Limit(check_wonderful_limit.final, value_x);
                        let intermediate_formula = substituteX(check_wonderful_limit.final, value_x);
                        renderedStep = format_Formula_For_MathJax(intermediate_formula);
                        html += `
                        <div>Таким образом получим:</div>
                        <div class="mathjax-text">\\[
                        \\lim_{{x \\to ${limitTo}}} ${renderedStep}=\\lim_{{x \\to ${limitTo}}} ${result.decimal}\\]
                        </div>
                        <div>Как извествено, предел const = const:</div>
                        <div class="mathjax-text">\\[
                        \\lim_{{\\begin{matrix} x \\to x_0 \\\\ x \\to {\\infty} \\end{matrix}}} C = C\\]
                        </div>
                        <div>Отсюда имеем:</div>
                        <div class="mathjax-text">\\[
                        \\lim_{{x \\to ${limitTo}}} ${result.decimal} = ${result.decimal}\\]
                        </div>
                        <div>Результат в виде обычной дроби: <span class="mathjax-text">\\[${result.fraction}\\]</span></div>
                        <div>Результат в виде десятичной дроби: <span class="mathjax-text">\\[${result.decimal}\\]</span></div>`;
                        return html;
                    } else {
                        renderedStep = format_Formula_For_MathJax(check_wonderful_limit.exp);
                        let renderstep_2 = format_Formula_For_MathJax(check_wonderful_limit.exp_siml);
                        html += `<div>В данном пределе уже можно применить первый замечательный предел.${check_wonderful_limit.theory}.</div>
                        <div>По первому замечательному пределу имеем:</div>
                        <span class="mathjax-text">\\[${check_wonderful_limit.renderstep} = ${renderstep_2}\\]</span>
                        <div>Тогда пределел примет вид:</div>`;
                        renderstep_2 = format_Formula_For_MathJax(check_wonderful_limit.final);
                        html += `<div><span class="mathjax-text">\\[\\lim_{{x \\to ${limitTo}}} ${check_wonderful_limit.renderstep}=\\lim_{{x \\to ${limitTo}}} ${renderstep_2}\\]</span>`;
                        result = calculate_Limit(check_wonderful_limit.final, value_x);
                        let intermediate_formula = substituteX(check_wonderful_limit.final, value_x);
                        renderedStep = format_Formula_For_MathJax(intermediate_formula);
                        html += `
                        <div>Таким образом получим:</div>
                        <div class="mathjax-text">\\[
                        \\lim_{{x \\to ${limitTo}}} ${renderedStep}=\\lim_{{x \\to ${limitTo}}} ${result.decimal}\\]
                        </div>
                        <div>Как извествено, предел const = const:</div>
                        <div class="mathjax-text">\\[
                        \\lim_{{\\begin{matrix} x \\to x_0 \\\\ x \\to {\\infty} \\end{matrix}}} C = C\\]
                        </div>
                        <div>Отсюда имеем:</div>
                        <div class="mathjax-text">\\[
                        \\lim_{{x \\to ${limitTo}}} ${result.decimal} = ${result.decimal}\\]
                        </div>
                        <div>Результат в виде обычной дроби: <span class="mathjax-text">\\[${result.fraction}\\]</span></div>
                        <div>Результат в виде десятичной дроби: <span class="mathjax-text">\\[${result.decimal}\\]</span></div>`;
                        return html;
                    }
                } else {
                    html += `<div>Рассмотрим числитель исходной дроби и проверим, можно ли применить какое-либо из тригонометрических свойств.</div>`;
                    let intermediate_numerator, theory, expression_found_numerator, updated_numerator, updated_denominator;
                    let renderstep_3_1 = '';
                    let renderstep_3_2 = '';
                    let replacement_expression_numerator = '';
                    let intermediate_verification_numerator = true;
                    let intermediate_denominator, expression_found_denominator;
                    let replacement_expression_denominator = '';
                    let intermediate_verification_denominator = true;
                    for (let i = 0; i < 5 && intermediate_verification_numerator; i++) {
                        if (i === 0) {
                            intermediate_numerator = analyze_Expression(numerator);
                            intermediate_verification_numerator = intermediate_numerator.found;
                            if (!intermediate_verification_numerator && i === 0) {
                                html += `<div>В данном числителе нет свойств, которые можно было бы применить.</div>`;
                            } else if (intermediate_numerator.priority === 2 && i != 0) {
                                intermediate_verification_numerator = false;
                            }
                            else {
                                theory = intermediate_numerator.theory;
                                html += `${theory}`;
                                updated_numerator = intermediate_numerator.updatedExpression;
                                expression_found_numerator = intermediate_numerator.expression_found;
                                replacement_expression_numerator = intermediate_numerator.replacement_Expression;
                                let renderstep_1 = format_Formula_For_MathJax(updated_numerator);
                                let renderstep_2 = format_Formula_For_MathJax(expression_found_numerator);
                                renderstep_3_1 = format_Formula_For_MathJax(replacement_expression_numerator);
                                let updated_numerator_Simplified = Algebrite.simplify(updated_numerator).toString();
                                let renderstep_4 = format_Formula_For_MathJax(updated_numerator_Simplified);
                                html += `<div>Таким образом:</div>
                                <div class="mathjax-text">\\[${renderstep_2} = ${renderstep_3_1}\\]</div>
                                <div>Обновлённый числитель:</div>
                                <div class="mathjax-text">\\[${renderstep_1}\\]</div>
                                <div>Который также можно записать в виде:</div>
                                <div class="mathjax-text">\\[${renderstep_4}\\]</div>`;
                            }
                        }
                        else {
                            let intermediate_numerator_1 = analyze_Expression(intermediate_numerator.updatedExpression);
                            intermediate_verification_numerator = intermediate_numerator_1.found;
                            if (intermediate_verification_numerator) {
                                intermediate_numerator = intermediate_numerator_1;
                                if (!intermediate_verification_numerator && i === 0) {
                                    html += `<div>В данном числителе нет свойств, которые можно было бы применить.</div>`;
                                } else if (intermediate_numerator.priority === 2 && i != 0) {
                                    intermediate_verification_numerator = false;
                                }
                                else {
                                    theory = intermediate_numerator.theory;
                                    html += `${theory}`;
                                    updated_numerator = intermediate_numerator.updatedExpression;
                                    expression_found_numerator = intermediate_numerator.expression_found;
                                    replacement_expression_numerator = intermediate_numerator.replacement_Expression;
                                    let renderstep_1 = format_Formula_For_MathJax(updated_numerator);
                                    let renderstep_2 = format_Formula_For_MathJax(expression_found_numerator);
                                    renderstep_3_1 = format_Formula_For_MathJax(replacement_expression_numerator);
                                    let updated_numerator_Simplified = Algebrite.simplify(updated_numerator).toString();
                                    let renderstep_4 = format_Formula_For_MathJax(updated_numerator_Simplified);
                                    html += `<div>Таким образом:</div>
                                    <div class="mathjax-text">\\[${renderstep_2} = ${renderstep_3_1}\\]</div>
                                    <div>Обновлённый числитель:</div>
                                    <div class="mathjax-text">\\[${renderstep_1}\\]</div>
                                    <div>Который также можно записать в виде:</div>
                                    <div class="mathjax-text">\\[${renderstep_4}\\]</div>`;
                                }
                            }
                        }
                    }

                    if (renderstep_3_1 === '') {
                        renderstep_3_1 = format_Formula_For_MathJax(numerator);
                    }
                    if (renderstep_3_2 === '') {
                        renderstep_3_2 = format_Formula_For_MathJax(denominator);
                    }

                    if (replacement_expression_numerator === '') {
                        replacement_expression_numerator = numerator;
                    }
                    if (replacement_expression_denominator === '') {
                        replacement_expression_denominator = denominator;
                    }

                    let full_exp = `(${replacement_expression_numerator})/(${replacement_expression_denominator})`;
                    let full_exp_siml = Algebrite.simplify(full_exp).toString();
                    let renderstep_1 = format_Formula_For_MathJax(full_exp_siml);
                    html += `<div>Попробуем упростить получившуюся дробь:</div>
                    <div class="mathjax-text">\\[\\frac{${renderstep_3_1}}{${renderstep_3_2}}\\]</div>
                    <div>Результат упрощения:</div>
                    <div class="mathjax-text">\\[${renderstep_1}\\]</div>`;
                    let full;
                    check_wonderful_limit = check_First_Remarkable_Limit(full_exp_siml);
                    if (check_wonderful_limit.found) {
                        for (let i = 0; i < 5 && check_wonderful_limit.found; i++) {
                            if (i === 0) {
                                check_wonderful_limit = check_wonderful_limit;
                                if (check_wonderful_limit.flag) {
                                    renderedStep = format_Formula_For_MathJax(check_wonderful_limit.exp);
                                    let renderstep_2 = format_Formula_For_MathJax(check_wonderful_limit.exp_siml);
                                    html += `<div>В данном пределе можно применить первый замечательный предел, т.к имеется выражение:</div>
                                    <span class="mathjax-text">\\[${renderedStep}\\]</span>
                                    <div>По первому замечательному пределу имеем:</div>
                                    <span class="mathjax-text">\\[${renderedStep} = ${renderstep_2}\\]</span>
                                    <div>Тогда пределел примет вид:</div>`;
                                    renderedStep = format_Formula_For_MathJax(user_Formula);
                                    renderstep_2 = format_Formula_For_MathJax(check_wonderful_limit.final);
                                    full = check_wonderful_limit.final;
                                    html += `<div><span class="mathjax-text">\\[\\lim_{{x \\to ${limitTo}}} ${renderedStep}=\\lim_{{x \\to ${limitTo}}} ${renderstep_2}\\]</span>`;
                                } else {
                                    if (i === 0) {
                                        check_wonderful_limit = check_wonderful_limit;
                                    } else {
                                        check_wonderful_limit = check_First_Remarkable_Limit(full);
                                    }
                                    full = check_wonderful_limit.final;
                                    renderedStep = format_Formula_For_MathJax(check_wonderful_limit.exp);
                                    let renderstep_2 = format_Formula_For_MathJax(check_wonderful_limit.exp_siml);
                                    html += `<div>В данном пределе можно применить первый замечательный предел.${check_wonderful_limit.theory}.</div>
                                    <div>По первому замечательному пределу имеем:</div>
                                    <span class="mathjax-text">\\[${check_wonderful_limit.renderstep} = ${renderstep_2}\\]</span>
                                    <div>Тогда пределел примет вид:</div>`;
                                    renderstep_2 = format_Formula_For_MathJax(check_wonderful_limit.final);
                                    html += `<div><span class="mathjax-text">\\[\\lim_{{x \\to ${limitTo}}} ${check_wonderful_limit.renderstep}=\\lim_{{x \\to ${limitTo}}} ${renderstep_2}\\]</span>`;
                                }
                            } else {
                                let check_wonderful_limit_1 = check_First_Remarkable_Limit(full);
                                if (check_wonderful_limit_1.found) {
                                    check_wonderful_limit = check_wonderful_limit_1;
                                    if (check_wonderful_limit.flag) {
                                        renderedStep = format_Formula_For_MathJax(check_wonderful_limit.exp);
                                        let renderstep_2 = format_Formula_For_MathJax(check_wonderful_limit.exp_siml);
                                        html += `<div>В данном пределе можно применить первый замечательный предел, т.к имеется выражение:</div>
                                            <span class="mathjax-text">\\[${renderedStep}\\]</span>
                                            <div>По первому замечательному пределу имеем:</div>
                                            <span class="mathjax-text">\\[${renderedStep} = ${renderstep_2}\\]</span>
                                            <div>Тогда пределел примет вид:</div>`;
                                        renderedStep = format_Formula_For_MathJax(user_Formula);
                                        renderstep_2 = format_Formula_For_MathJax(check_wonderful_limit.final);
                                        full = check_wonderful_limit.final;
                                        html += `<div><span class="mathjax-text">\\[\\lim_{{x \\to ${limitTo}}} ${renderedStep}=\\lim_{{x \\to ${limitTo}}} ${renderstep_2}\\]</span>`;
                                    } else {
                                        if (i === 0) {
                                            check_wonderful_limit = check_wonderful_limit;
                                        } else {
                                            check_wonderful_limit = check_First_Remarkable_Limit(full);
                                        }
                                        full = check_wonderful_limit.final;
                                        renderedStep = format_Formula_For_MathJax(check_wonderful_limit.exp);
                                        let renderstep_2 = format_Formula_For_MathJax(check_wonderful_limit.exp_siml);
                                        html += `<div>В данном пределе можно применить первый замечательный предел.${check_wonderful_limit.theory}.</div>
                                            <div>По первому замечательному пределу имеем:</div>
                                            <span class="mathjax-text">\\[${check_wonderful_limit.renderstep} = ${renderstep_2}\\]</span>
                                            <div>Тогда пределел примет вид:</div>`;
                                        renderstep_2 = format_Formula_For_MathJax(check_wonderful_limit.final);
                                        html += `<div><span class="mathjax-text">\\[\\lim_{{x \\to ${limitTo}}} ${check_wonderful_limit.renderstep}=\\lim_{{x \\to ${limitTo}}} ${renderstep_2}\\]</span>`;
                                    }
                                }
                                else {
                                }
                            }
                        }
                        result = calculate_Limit(check_wonderful_limit.final, value_x);
                        let intermediate_formula = substituteX(check_wonderful_limit.final, value_x);
                        renderedStep = format_Formula_For_MathJax(intermediate_formula);
                        html += `
                        <div>Таким образом получим:</div>
                        <div class="mathjax-text">\\[
                        \\lim_{{x \\to ${limitTo}}} ${renderedStep}=\\lim_{{x \\to ${limitTo}}} ${result.decimal}\\]
                        </div>
                        <div>Как извествено, предел const = const:</div>
                        <div class="mathjax-text">\\[
                        \\lim_{{\\begin{matrix} x \\to x_0 \\\\ x \\to {\\infty} \\end{matrix}}} C = C\\]
                        </div>
                        <div>Отсюда имеем:</div>
                        <div class="mathjax-text">\\[
                        \\lim_{{x \\to ${limitTo}}} ${result.decimal} = ${result.decimal}\\]
                        </div>
                        <div>Результат в виде обычной дроби: <span class="mathjax-text">\\[${result.fraction}\\]</span></div>
                        <div>Результат в виде десятичной дроби: <span class="mathjax-text">\\[${result.decimal}\\]</span></div>`;
                        return html;
                    } else {
                        result = calculate_Limit(full_exp_siml, value_x);
                        if (nerdamer(result.decimal).isNumber()) {
                            let intermediate_formula = substituteX(full_exp_siml, value_x);
                            renderedStep = format_Formula_For_MathJax(intermediate_formula);
                            html += `
                                    <div>Таким образом получим:</div>
                                    <div class="mathjax-text">\\[
                                    \\lim_{{x \\to ${limitTo}}} ${renderedStep}=\\lim_{{x \\to ${limitTo}}} ${result.decimal}\\]
                                    </div>
                                    <div>Как извествено, предел const = const:</div>
                                    <div class="mathjax-text">\\[
                                    \\lim_{{\\begin{matrix} x \\to x_0 \\\\ x \\to {\\infty} \\end{matrix}}} C = C\\]
                                    </div>
                                    <div>Отсюда имеем:</div>
                                    <div class="mathjax-text">\\[
                                    \\lim_{{x \\to ${limitTo}}} ${result.decimal} = ${result.decimal}\\]
                                    </div>
                                    <div>Результат в виде обычной дроби: <span class="mathjax-text">\\[${result.fraction}\\]</span></div>
                                    <div>Результат в виде десятичной дроби: <span class="mathjax-text">\\[${result.decimal}\\]</span></div>`;
                            return html;
                        } else {
                            html += `<div>Теперь рассмотрим знаменатель исходной дроби и проверим, можно ли применить какое-либо из тригонометрических свойств.</div>`;
                            for (let i = 0; i < 5 && intermediate_verification_denominator; i++) {
                                if (i === 0) {
                                    intermediate_denominator = analyze_Expression(denominator);
                                    intermediate_verification_denominator = intermediate_denominator.found;
                                    if (!intermediate_verification_denominator && i === 0) {
                                        html += `<div>В данном числителе нет свойств, которые можно было бы применить.</div>`;
                                    } else if (intermediate_denominator.priority === 2 && i != 0) {
                                        intermediate_verification_denominator = false;
                                    }
                                    else {
                                        theory = intermediate_denominator.theory;
                                        html += `${theory}`;
                                        updated_denominator = intermediate_denominator.updatedExpression;
                                        expression_found_denominator = intermediate_denominator.expression_found;
                                        replacement_expression_denominator = intermediate_denominator.replacement_Expression;
                                        let renderstep_1 = format_Formula_For_MathJax(updated_denominator);
                                        let renderstep_2 = format_Formula_For_MathJax(expression_found_denominator);
                                        renderstep_3_1 = format_Formula_For_MathJax(replacement_expression_denominator);
                                        let updated_denominator_Simplified = Algebrite.simplify(updated_denominator).toString();
                                        let renderstep_4 = format_Formula_For_MathJax(updated_denominator_Simplified);
                                        html += `<div>Таким образом:</div>
                                    <div class="mathjax-text">\\[${renderstep_2} = ${renderstep_3_1}\\]</div>
                                    <div>Обновлённый числитель:</div>
                                    <div class="mathjax-text">\\[${renderstep_1}\\]</div>
                                    <div>Который также можно записать в виде:</div>
                                    <div class="mathjax-text">\\[${renderstep_4}\\]</div>`;
                                    }
                                }
                                else {
                                    let intermediate_denominator_1 = analyze_Expression(intermediate_denominator.updatedExpression);
                                    intermediate_verification_denominator = intermediate_denominator_1.found;
                                    if (intermediate_verification_denominator) {
                                        intermediate_denominator = intermediate_denominator_1;
                                        if (!intermediate_verification_denominator && i === 0) {
                                            html += `<div>В данном числителе нет свойств, которые можно было бы применить.</div>`;
                                        } else if (intermediate_denominator.priority === 2 && i != 0) {
                                            intermediate_verification_denominator = false;
                                        }
                                        else {
                                            theory = intermediate_denominator.theory;
                                            html += `${theory}`;
                                            updated_denominator = intermediate_denominator.updatedExpression;
                                            expression_found_denominator = intermediate_denominator.expression_found;
                                            replacement_expression_denominator = intermediate_denominator.replacement_Expression;
                                            let renderstep_1 = format_Formula_For_MathJax(updated_denominator);
                                            let renderstep_2 = format_Formula_For_MathJax(expression_found_denominator);
                                            renderstep_3_1 = format_Formula_For_MathJax(replacement_expression_denominator);
                                            let updated_denominator_Simplified = Algebrite.simplify(updated_denominator).toString();
                                            let renderstep_4 = format_Formula_For_MathJax(updated_denominator_Simplified);
                                            html += `<div>Таким образом:</div>
                                        <div class="mathjax-text">\\[${renderstep_2} = ${renderstep_3_1}\\]</div>
                                        <div>Обновлённый числитель:</div>
                                        <div class="mathjax-text">\\[${renderstep_1}\\]</div>
                                        <div>Который также можно записать в виде:</div>
                                        <div class="mathjax-text">\\[${renderstep_4}\\]</div>`;
                                        }
                                    }
                                }
                            }
                            if (renderstep_3_1 === '') {
                                renderstep_3_1 = format_Formula_For_MathJax(numerator);
                            }
                            if (renderstep_3_2 === '') {
                                renderstep_3_2 = format_Formula_For_MathJax(denominator);
                            }

                            if (replacement_expression_numerator === '') {
                                replacement_expression_numerator = numerator;
                            }
                            if (replacement_expression_denominator === '') {
                                replacement_expression_denominator = denominator;
                            }

                            full_exp = `(${replacement_expression_numerator})/(${replacement_expression_denominator})`;
                            full_exp_siml = Algebrite.simplify(full_exp).toString();
                            renderstep_1 = format_Formula_For_MathJax(full_exp_siml);
                            html += `<div>Попробуем упростить получившуюся дробь:</div>
                            <div class="mathjax-text">\\[\\frac{${renderstep_3_1}}{${renderstep_3_2}}\\]</div>
                            <div>Результат упрощения:</div>
                            <div class="mathjax-text">\\[${renderstep_1}\\]</div>`;
                            let full;
                            check_wonderful_limit = check_First_Remarkable_Limit(full_exp_siml);
                            if (check_wonderful_limit.found) {
                                for (let i = 0; i < 5 && check_wonderful_limit.found; i++) {
                                    if (i === 0) {
                                        check_wonderful_limit = check_wonderful_limit;
                                        if (check_wonderful_limit.flag) {
                                            renderedStep = format_Formula_For_MathJax(check_wonderful_limit.exp);
                                            let renderstep_2 = format_Formula_For_MathJax(check_wonderful_limit.exp_siml);
                                            html += `<div>В данном пределе можно применить первый замечательный предел, т.к имеется выражение:</div>
                                        <span class="mathjax-text">\\[${renderedStep}\\]</span>
                                        <div>По первому замечательному пределу имеем:</div>
                                        <span class="mathjax-text">\\[${renderedStep} = ${renderstep_2}\\]</span>
                                        <div>Тогда пределел примет вид:</div>`;
                                            renderedStep = format_Formula_For_MathJax(user_Formula);
                                            renderstep_2 = format_Formula_For_MathJax(check_wonderful_limit.final);
                                            full = check_wonderful_limit.final;
                                            html += `<div><span class="mathjax-text">\\[\\lim_{{x \\to ${limitTo}}} ${renderedStep}=\\lim_{{x \\to ${limitTo}}} ${renderstep_2}\\]</span>`;
                                        } else {
                                            if (i === 0) {
                                                check_wonderful_limit = check_wonderful_limit;
                                            } else {
                                                check_wonderful_limit = check_First_Remarkable_Limit(full);
                                            }
                                            full = check_wonderful_limit.final;
                                            renderedStep = format_Formula_For_MathJax(check_wonderful_limit.exp);
                                            let renderstep_2 = format_Formula_For_MathJax(check_wonderful_limit.exp_siml);
                                            html += `<div>В данном пределе можно применить первый замечательный предел.${check_wonderful_limit.theory}.</div>
                                        <div>По первому замечательному пределу имеем:</div>
                                        <span class="mathjax-text">\\[${check_wonderful_limit.renderstep} = ${renderstep_2}\\]</span>
                                        <div>Тогда пределел примет вид:</div>`;
                                            renderstep_2 = format_Formula_For_MathJax(check_wonderful_limit.final);
                                            html += `<div><span class="mathjax-text">\\[\\lim_{{x \\to ${limitTo}}} ${check_wonderful_limit.renderstep}=\\lim_{{x \\to ${limitTo}}} ${renderstep_2}\\]</span>`;
                                        }
                                    } else {
                                        let check_wonderful_limit_1 = check_First_Remarkable_Limit(full);
                                        if (check_wonderful_limit_1.found) {
                                            check_wonderful_limit = check_wonderful_limit_1;
                                            if (check_wonderful_limit.flag) {
                                                renderedStep = format_Formula_For_MathJax(check_wonderful_limit.exp);
                                                let renderstep_2 = format_Formula_For_MathJax(check_wonderful_limit.exp_siml);
                                                html += `<div>В данном пределе можно применить первый замечательный предел, т.к имеется выражение:</div>
                                                <span class="mathjax-text">\\[${renderedStep}\\]</span>
                                                <div>По первому замечательному пределу имеем:</div>
                                                <span class="mathjax-text">\\[${renderedStep} = ${renderstep_2}\\]</span>
                                                <div>Тогда пределел примет вид:</div>`;
                                                renderedStep = format_Formula_For_MathJax(user_Formula);
                                                renderstep_2 = format_Formula_For_MathJax(check_wonderful_limit.final);
                                                full = check_wonderful_limit.final;
                                                html += `<div><span class="mathjax-text">\\[\\lim_{{x \\to ${limitTo}}} ${renderedStep}=\\lim_{{x \\to ${limitTo}}} ${renderstep_2}\\]</span>`;
                                            } else {
                                                if (i === 0) {
                                                    check_wonderful_limit = check_wonderful_limit;
                                                } else {
                                                    check_wonderful_limit = check_First_Remarkable_Limit(full);
                                                }
                                                full = check_wonderful_limit.final;
                                                renderedStep = format_Formula_For_MathJax(check_wonderful_limit.exp);
                                                let renderstep_2 = format_Formula_For_MathJax(check_wonderful_limit.exp_siml);
                                                html += `<div>В данном пределе можно применить первый замечательный предел.${check_wonderful_limit.theory}.</div>
                                                <div>По первому замечательному пределу имеем:</div>
                                                <span class="mathjax-text">\\[${check_wonderful_limit.renderstep} = ${renderstep_2}\\]</span>
                                                <div>Тогда пределел примет вид:</div>`;
                                                renderstep_2 = format_Formula_For_MathJax(check_wonderful_limit.final);
                                                html += `<div><span class="mathjax-text">\\[\\lim_{{x \\to ${limitTo}}} ${check_wonderful_limit.renderstep}=\\lim_{{x \\to ${limitTo}}} ${renderstep_2}\\]</span>`;
                                            }
                                        }
                                        else {
                                        }
                                    }
                                }
                                result = calculate_Limit(check_wonderful_limit.final, value_x);
                                let intermediate_formula = substituteX(check_wonderful_limit.final, value_x);
                                renderedStep = format_Formula_For_MathJax(intermediate_formula);
                                html += `
                            <div>Таким образом получим:</div>
                            <div class="mathjax-text">\\[
                            \\lim_{{x \\to ${limitTo}}} ${renderedStep}=\\lim_{{x \\to ${limitTo}}} ${result.decimal}\\]
                            </div>
                            <div>Как извествено, предел const = const:</div>
                            <div class="mathjax-text">\\[
                            \\lim_{{\\begin{matrix} x \\to x_0 \\\\ x \\to {\\infty} \\end{matrix}}} C = C\\]
                            </div>
                            <div>Отсюда имеем:</div>
                            <div class="mathjax-text">\\[
                            \\lim_{{x \\to ${limitTo}}} ${result.decimal} = ${result.decimal}\\]
                            </div>
                            <div>Результат в виде обычной дроби: <span class="mathjax-text">\\[${result.fraction}\\]</span></div>
                            <div>Результат в виде десятичной дроби: <span class="mathjax-text">\\[${result.decimal}\\]</span></div>`;
                                return html;
                            }

                            result = calculate_Limit(full_exp_siml, value_x);
                            if (nerdamer(result.decimal).isNumber()) {
                                let intermediate_formula = substituteX(full_exp_siml, value_x);
                                renderedStep = format_Formula_For_MathJax(intermediate_formula);
                                html += `
                                        <div>Таким образом получим:</div>
                                        <div class="mathjax-text">\\[
                                        \\lim_{{x \\to ${limitTo}}} ${renderedStep}=\\lim_{{x \\to ${limitTo}}} ${result.decimal}\\]
                                        </div>
                                        <div>Как извествено, предел const = const:</div>
                                        <div class="mathjax-text">\\[
                                        \\lim_{{\\begin{matrix} x \\to x_0 \\\\ x \\to {\\infty} \\end{matrix}}} C = C\\]
                                        </div>
                                        <div>Отсюда имеем:</div>
                                        <div class="mathjax-text">\\[
                                        \\lim_{{x \\to ${limitTo}}} ${result.decimal} = ${result.decimal}\\]
                                        </div>
                                        <div>Результат в виде обычной дроби: <span class="mathjax-text">\\[${result.fraction}\\]</span></div>
                                        <div>Результат в виде десятичной дроби: <span class="mathjax-text">\\[${result.decimal}\\]</span></div>`;
                                return html;
                            } else {
                                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел, т.к. необходимо, чтобы x стремился к 0.</div>`;
                                return html;
                        
                            }
                        }
                    }
                }
            }
        }
        return html;
    } else {
        html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел, т.к. необходимо, чтобы x стремился к 0.</div>`;
        return html;
    }

}
