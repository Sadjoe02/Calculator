const lopital_rules = `<br>Сначала вспомним правила Лопиталя. Первое - это правлило Лопиталя раскрытия неопределённостей вида 0/0:
<br>Пусть функции f(x) и φ(x) непрерывны и дифференцируемы в окрестности точки x<sub>0</sub> и обращаются в нуль в этой точке: f(x<sub>0</sub>) = 
φ(x<sub>0</sub>) = 0. Пусть φ'(x) ≠ 0 в окрестности точки x<sub>0</sub>. Если существует предел
<span class="mathjax-text">\\[\\lim_{x{\\to}x_0}\\frac{f'(x)}{{\\varphi}'(x)}=l,\\]</span>
то
<span class="mathjax-text">\\[\\lim_{x{\\to}x_0}\\frac{f(x)}{{\\varphi}(x)}=\\lim_{x{\\to}x_0}\\frac{f'(x)}{{\\varphi}'(x)}=l.\\]</span>
Второе - это правлило Лопиталя раскрытия неопределённостей вида ∞/∞:
<br>Пусть функции f(x) и φ(x) непрерывны и дифференцируемы в окрестности точки x<sub>0</sub> (кроме, может быть, точки x<sub>0</sub>)в этой окресности 
<span class="mathjax-text">\\[\\lim_{x{\\to}x_0}f(x)=\\lim_{x{\\to}x_0}{\\varphi}(x)={\\infty}.\\]</span>
Если существует предел
<span class="mathjax-text">\\[\\lim_{x{\\to}x_0}\\frac{f'(x)}{{\\varphi}'(x)}=l,\\]</span>
то
<span class="mathjax-text">\\[\\lim_{x{\\to}x_0}\\frac{f(x)}{{\\varphi}(x)}=\\lim_{x{\\to}x_0}\\frac{f'(x)}{{\\varphi}'(x)}.\\]</span>
Кроме этого необходимо вспомнить сами производные:
<span class="mathjax-text">\\[c'=0, c=const\\]</span>
<span class="mathjax-text">\\[(x^n)'=nx^{n-1}\\]</span>
<span class="mathjax-text">\\[(a^x)'=a^x\\cdot\\ln{a}\\]</span>
<span class="mathjax-text">\\[(\\log_{a}x)'=\\frac{1}{x\\ln{a}}\\]</span>
<span class="mathjax-text">\\[(\\ln{x})'=\\frac{1}{x}\\]</span>
<span class="mathjax-text">\\[(\\sin x)'=\\cos x\\]</span>
<span class="mathjax-text">\\[(\\cos x)'=-\\sin x\\]</span>
<span class="mathjax-text">\\[(\\sqrt{x})'=\\frac{1}{2\\sqrt{x}}\\]</span>
<span class="mathjax-text">\\[(\\tan x)'=\\frac{1}{\\cos^2x}\\]</span>
<span class="mathjax-text">\\[(\\cot x)'=-\\frac{1}{\\sin^2x}\\]</span>
<span class="mathjax-text">\\[(\\arcsin x)'=\\frac{1}{\\sqrt{1-x^2}}\\]</span>
<span class="mathjax-text">\\[(\\arccos x)'=-\\frac{1}{\\sqrt{1-x^2}}\\]</span>
<span class="mathjax-text">\\[(\\arctan x)'=\\frac{1}{1+x^2}\\]</span>
<span class="mathjax-text">\\[(\\operatorname{arccot} x)'=-\\frac{1}{1+x^2}\\]</span>
<span class="mathjax-text">\\[(\\sinh x)'=\\cosh x\\]</span>
<span class="mathjax-text">\\[(\\cosh x)'=\\sinh x\\]</span>
<span class="mathjax-text">\\[(\\coth x)'=-\\frac{1}{\\sinh^2 x}\\]</span>
<span class="mathjax-text">\\[(\\tanh x)'=\\frac{1}{\\cosh^2 x}\\]</span>
Также необходимо вспомнить, что такое производная сложной функции. Сложной является такая функция, у которой аргумент также является функций, например cos(2x+2). Обозначается это таким образом: f(g(x)). Имеем, что функция g(x) считаеся аргументом f(g(x)).
<br>Для решения производной сложной функции используяется данная формула: (f(g(x)))' = f'(g(x))*g'(x).
<br>Кроме этого также вспомним свойства производной: 
<span class="mathjax-text">\\[(u{\\pm}v)'=u'{\\pm}v'\\]</span>
<span class="mathjax-text">\\[(u\\cdot v)'=u'\\cdot v+u\\cdot v'\\]</span>
<span class="mathjax-text">\\[{\\left(\\frac{u}{v} \\right)}'=\\frac{u'\\cdot v-u\\cdot v'}{v^2}\\]</span>
<span class="mathjax-text">\\[(c\\cdot u)'=c\\cdot u', c=const\\]</span>`;

function createsolution_Steps_HTML_lopital_rule(formula, value_x, user_Formula, limitTo) {
    var simplified_formula = user_Formula;
    let renderedStep, html, expression_with_fraction_numerator, expression_with_fraction_denominator;
    var result;
    let numerator, denominator;
    var simplificationSteps = simplifyExpression_basic(user_Formula);


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
                html += `Данный предел относится к одному из основных видов неопределённостей: ∞/∞.`;
            } else if (calculated_numerator === '0' && calculated_denominator === '0') {
                html += `Данный предел относится к одному из основных видов неопределённостей: 0/0.`;
            } else if (calculated_numerator === '-∞' && calculated_denominator === '-∞') {
                html += `Данный предел относится к одному из основных видов неопределённостей: ∞/∞.`;
            } else {
                html += `<div><b>Неопределённости в данном пределе нет.</b></div><div>Попробуем упростить числитель исходного выражения.<p align="center"><b>Начало теоретического материала</b></p>${lopital_rules}<p align="center"><b>Конец теоретического материала</b></p><br>Приступим к упрощению числителя: </div>`;
                if (!simplificationSteps.changing_numerator) {
                    html += `<div><b>Числитель данного выражения не нуждается в упрощении.</b></div>`;
                }
                else {
                    renderedStep = format_Formula_For_MathJax(simplificationSteps.factorizedNumeratorMsg);
                    html += `<div>Упрощенный числитель имеет вид:</div>
                    <div class="mathjax-text">\\[${renderedStep}\\] </div>`;
                }

                html += `<div>Теперь попробуем упростить знаменатель исходного выражения: </div>`;
                if (!simplificationSteps.changing_denominator) {
                    html += `<div><b>Знаменатель данного выражения не нуждается в упрощении.</b></div>`;
                }
                else {
                    renderedStep = format_Formula_For_MathJax(simplificationSteps.factorizedDenominatorMsg);
                    html += `<div>Упрощенный знаменатель имеет вид:</div>
                    <div class="mathjax-text">\\[${renderedStep}\\] </div>`;
                }

                if (!simplificationSteps.changing_numerator && !simplificationSteps.changing_denominator) {
                    html += `<div>Т.к ни числитель ни знаменатель не подверглись упрощению рассмотрим дробь целиком.</div>`;
                    if (simplificationSteps.changing_exp_2) {
                        html += `<div>Упрощение дроби целиком привело к данному результату:</div>`;
                        simplified_formula = simplificationSteps.simplifiedExpr;
                        renderedStep = format_Formula_For_MathJax(simplificationSteps.simplifiedExpr);
                        html += `<div class="mathjax-text">\\[ \\lim_{{x \\to ${limitTo}}} ${renderedStep}\\] </div>`;
                    } else {
                        html += `<div>Упрощение дроби целиком не привело к изменениям</div>`;
                    }
                } else {
                    html += `<div>Упрощение числители и/или знаменятеля привели к данному результату:</div>`;
                    renderedStep = format_Formula_For_MathJax(simplificationSteps.factorizedExpr);
                    html += `<div class="mathjax-text">\\[ \\lim_{{x \\to ${limitTo}}} ${renderedStep}\\] </div>`;
                    html += `<div>Теперь попробуем упростить дробь целиком.</div>`;
                    if (simplificationSteps.changing_exp_2) {
                        html += `<div>Упрощение дроби целиком привело к данному результату:</div>`;
                        simplified_formula = simplificationSteps.simplifiedExpr;
                        renderedStep = format_Formula_For_MathJax(simplificationSteps.simplifiedExpr);
                        html += `<div class="mathjax-text">\\[ \\lim_{{x \\to ${limitTo}}} ${renderedStep}\\] </div>`;
                    } else {
                        html += `<div><b>Упрощение дроби целиком не привело к изменениям</b></div>`;
                    }
                }
                result = calculate_Limit(simplified_formula, value_x);
                let intermediate_formula = substituteX(simplified_formula, value_x);
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

            html += `<div><p align="center"><b>Начало теоретического материала</b></p>${lopital_rules}<p align="center"><b>Конец теоретического материала</b></p></div>`;
            let differentiated_numerator, differentiated_denominator;
            let updated_full_exp = '';
            html += `<div>Так как в данном пределе существует неопределённость, можно применить правило Лопиталя.</div>`;
            let check = true;
            for (let i = 0; i < 10 && check; i++) {
                if (i == 0) {
                    simplificationSteps = simplifyExpression_basic(user_Formula);
                } 
                numerator = simplificationSteps.numerator;
                denominator = simplificationSteps.denominator;
                differentiated_numerator = nerdamer(`diff(${numerator}, x)`);
                differentiated_denominator = nerdamer(`diff(${denominator}, x)`);
                updated_full_exp = `(${differentiated_numerator})/(${differentiated_denominator})`;
                let renderstep_1 = format_Formula_For_MathJax(numerator);
                let renderstep_2 = format_Formula_For_MathJax(denominator);
                let renderstep_3 = format_Formula_For_MathJax(differentiated_numerator);;
                let renderstep_4 = format_Formula_For_MathJax(differentiated_denominator);;
                html += `<div>Числитель примет вид:</div>
                <div class="mathjax-text">\\[(${renderstep_1})'=${renderstep_3}\\]</div>
                <div>Знаменатель примет вид:</div>
                <div class="mathjax-text">\\[(${renderstep_2})'=${renderstep_4}\\]</div>
                <div>Обновлённая дробь:</div>
                <div class="mathjax-text">\\[\\frac{${renderstep_3}}{${renderstep_4}}\\]</div>
                <div>Проверим, осталась ли неопределённость:</div>`;
                simplificationSteps = simplifyExpression_basic(updated_full_exp);
                calculated_numerator = calculate_Limit(simplificationSteps.numerator, value_x).decimal;
                calculated_denominator = calculate_Limit(simplificationSteps.denominator, value_x).decimal;
                //Подставлено в числитель и знаменатель
                substituted_into_numerator = substituteX(simplificationSteps.numerator, value_x);
                substituted_into_denominator = substituteX(simplificationSteps.denominator, value_x);
                //Обработанные числитель и знаменатель
                render_numerator = format_Formula_For_MathJax(simplificationSteps.numerator);
                render_denominator = format_Formula_For_MathJax(simplificationSteps.denominator);
                //Обработанные подставленные в числитель и знаменатель
                render_substituted_into_numerator = format_Formula_For_MathJax(substituted_into_numerator);
                render_substituted_into_denominator = format_Formula_For_MathJax(substituted_into_denominator);
                html += `
                <div>Подставим значение \( x = ${value_x} \) в обновлённую функцию 
                <span class="mathjax-text">\\[f(x) = \\frac{${renderstep_3}}{${renderstep_4}}\\]</span></div>
                <div class="mathjax-text">\\[
                \\lim_{{x \\to ${limitTo}}} \\frac{${renderstep_3}}{${renderstep_4}} = \\lim_{{x \\to ${limitTo}}} \\frac{${render_numerator}}{${render_denominator}} = 
                \\lim_{{x \\to ${limitTo}}} \\frac{${render_substituted_into_numerator}}{${render_substituted_into_denominator}} =
                \\lim_{{x \\to ${limitTo}}} \\frac{${calculated_numerator}}{${calculated_denominator}}\\]
                </div>`;
                if (calculated_numerator === '∞' && calculated_denominator === '∞') {
                    html += `Избавиться от неопределённости пока что не удалось. Попробуем применить правило Лопиталя ещё раз.`;
                } else if (calculated_numerator === '0' && calculated_denominator === '0') {
                    html += `Избавиться от неопределённости пока что не удалось. Попробуем применить правило Лопиталя ещё раз.`;
                } else if (calculated_numerator === '-∞' && calculated_denominator === '-∞') {
                    html += `Избавиться от неопределённости пока что не удалось. Попробуем применить правило Лопиталя ещё раз.`;
                } else {
                    check = false;
                }
            }
            if (check) {
                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел, т.к. необходимо, чтобы x стремился к 0.</div>`;
                return html;        
            } else if (updated_full_exp === '') {
                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел, т.к. необходимо, чтобы x стремился к 0.</div>`;
                return html;        
            } else {
                result = calculate_Limit(updated_full_exp, value_x);
                let intermediate_formula = substituteX(updated_full_exp, value_x);
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
        }
    }
    return html;
}

