function createsolution_Steps_HTML_for_irrationality(formula, value_x, user_Formula, limitTo) {
    console.log(value_x);
    console.log(limitTo);

    var simplified_formula = user_Formula;
    let full_Expression_numerator_dop, full_Expression_denominator_dop, full_Expression_numerator_final, full_Expression_denominator_final;
    let full_num_vr, num_vr1, general_vr2, general_vr3, full_den_vr, den_vr1, full_vr;
    let full_Expression_numerator, full_Expression_denominator, complete_non_simplified_expression, complete_simplified_expression;
    let renderedStep, decomposed_numerator, decomposed_denominator, example_changed, final_simplification, html, expression_with_fraction_numerator, expression_with_fraction_denominator;
    let simplified_Root1_in_numerator, simplified_Root2_in_numerator, simplified2_in_numerator, final_simplified_Root1_in_numerator, final_simplified_Root2_in_numerator, final_simplified2_in_numerator, number_roots_numerator, number_roots_denominator, simplified_root_expression, simplified_remaining_expression, intermediate_variable_check;
    let simplified_Root1_in_denominator, simplified_Root2_in_denominator, simplified2_in_denominator, final_simplified_Root1_in_denominator, final_simplified_Root2_in_denominator, final_simplified2_in_denominator;
    var result, simplificationSteps_intermediate;
    let part_numerator, part_denominator, numerator, denominator;
    var simplificationSteps = simplifyExpression_basic(user_Formula);

    expression_with_fraction_numerator = find_Roots(simplificationSteps.numerator);
    expression_with_fraction_denominator = find_Roots(simplificationSteps.denominator);
    console.log(expression_with_fraction_numerator);
    console.log(expression_with_fraction_denominator);

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
        } else if (!expression_with_fraction_numerator.has_Root && !expression_with_fraction_denominator.has_Root) {
            html = `<div>Вы неверно определили тип предела, пожалуйста, будьте внимательнее.</div>`;
        } else {
            //Вычисленные числитель и знаменатель
            let calculated_numerator = calculate_Limit(simplificationSteps.numerator, value_x).decimal;
            let calculated_denominator = calculate_Limit(simplificationSteps.denominator, value_x).decimal;
            console.log(simplificationSteps.numerator);
            console.log(simplificationSteps.denominator);

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
                html += `<div><b>Неопределённости в данном пределе нет.</b></div><div>Попробуем упростить числитель исходного выражения.<p align="center"><b>Начало теоретического материала</b></p><br>${simplification_methods} <br>Рассмотрим подробнее два из них: формулы сокращённого умножения и Рационализация.${abbreviated_multiplication_formulas}${rationalization_denominator}           
                <br><p align="center"><b>Конец теоретического материала</b></p><br>Приступим к упрощению числителя: </div>`;
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

            html += `<div><p align="center"><b>Начало теоретического материала</b></p><br>Сначала рассмотрим методы упрощения. ${simplification_methods} <br>Рассмотрим подробнее два из них: формулы сокращённого умножения и рационализацию.${abbreviated_multiplication_formulas}${rationalization_denominator}<p align="center"><b>Конец теоретического материала</b></p></div>`;

            if (expression_with_fraction_numerator.has_Root) {
                intermediate_variable_check = find_Roots(expression_with_fraction_numerator.remaining_Expression);
                
                if (intermediate_variable_check.has_Root) {
                    html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                    return html;
                } else {
                    number_roots_numerator = expression_with_fraction_numerator.bases.length;
                    if (number_roots_numerator >= 3) {
                        html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                        return html;
                    } else if (number_roots_numerator === 2 && expression_with_fraction_numerator.remaining_Expression !== '0') {
                        html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                        return html;
                    } else if (number_roots_numerator === 2 && expression_with_fraction_numerator.remaining_Expression === '0') {
                        html += `<div>В числителе исходной дроби присутствует два корня. Попробуем упросить оба подкоренных выражения:</div>`;
                        simplified_Root1_in_numerator = simplifyExpression_basic(expression_with_fraction_numerator.bases[0]);
                        simplified_Root2_in_numerator = simplifyExpression_basic(expression_with_fraction_numerator.bases[1]);
                        if (simplified_Root1_in_numerator.changing_exp) {
                            final_simplified_Root1_in_numerator = simplified_Root1_in_numerator.factorizedExpr;
                            renderedStep = format_Formula_For_MathJax(final_simplified_Root1_in_numerator);
                            html += `<div>Первое упрощённое подкроенное выражение имеет вид:</div>
                                <div class="mathjax-text">\\[${renderedStep}\\] </div>`;
                        } else {
                            final_simplified_Root1_in_numerator = expression_with_fraction_numerator.bases[0];
                            html += `<div><b>Первое подкоренное выражение не нуждается в упрощении.</b></div>`;
                        }

                        if (simplified_Root2_in_numerator.changing_exp) {
                            final_simplified_Root2_in_numerator = simplified_Root2_in_numerator.factorizedExpr;
                            renderedStep = format_Formula_For_MathJax(final_simplified_Root2_in_numerator);
                            html += `<div>Второе упрощённое подкроенное выражение имеет вид:</div>
                                <div class="mathjax-text">\\[${renderedStep}\\] </div>`;
                        } else {
                            final_simplified_Root2_in_numerator = expression_with_fraction_numerator.bases[1];
                            html += `<div><b>Второе подкоренное выражение не нуждается в упрощении.</b></div>`;
                        }
                        if (expression_with_fraction_numerator.signs[0] === '-' && expression_with_fraction_numerator.signs[1] === '+') {
                            full_Expression_numerator = `(${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]})${expression_with_fraction_numerator.signs[0]}(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})`
                            renderedStep = format_Formula_For_MathJax(full_Expression_numerator);
                            html += `<div>Итоговый числитель:</div>
                            <div class="mathjax-text">\\[${renderedStep}\\] </div>`;
                        } else if (expression_with_fraction_numerator.signs[0] === '+' && expression_with_fraction_numerator.signs[1] === '-') {
                            full_Expression_numerator = `(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})${expression_with_fraction_numerator.signs[1]}(${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]})`
                            renderedStep = format_Formula_For_MathJax(full_Expression_numerator);
                            html += `<div>Итоговый числитель:</div>
                            <div class="mathjax-text">\\[${renderedStep}\\] </div>`;
                        } else if (expression_with_fraction_numerator.signs[0] === '-' && expression_with_fraction_numerator.signs[1] === '-') {
                            full_Expression_numerator = `${expression_with_fraction_numerator.signs[0]}((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})+(${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))`
                            renderedStep = format_Formula_For_MathJax(full_Expression_numerator);
                            html += `<div>Итоговый числитель:</div>
                            <div class="mathjax-text">\\[${renderedStep}\\] </div>`;
                        } else if (expression_with_fraction_numerator.signs[0] === '+' && expression_with_fraction_numerator.signs[1] === '+') {
                            full_Expression_numerator = `(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})${expression_with_fraction_numerator.signs[0]}(${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]})`
                            renderedStep = format_Formula_For_MathJax(full_Expression_numerator);
                            html += `<div>Итоговый числитель:</div>
                            <div class="mathjax-text">\\[${renderedStep}\\] </div>`;
                        } else {
                            full_Expression_numerator = `${expression_with_fraction_numerator.signs[0]}(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})${expression_with_fraction_numerator.signs[1]}(${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]})`
                            renderedStep = format_Formula_For_MathJax(full_Expression_numerator);
                            html += `<div>Итоговый числитель:</div>
                            <div class="mathjax-text">\\[${renderedStep}\\] </div>`;
                        }

                    }
                    else if (number_roots_numerator === 1 && expression_with_fraction_numerator.remaining_Expression !== '0') {
                        html += `<div>В числителе исходной дроби присутствует корень. Попробуем упросить как подкоренное выражение, так и оставшееся. Для начала попытаемся упростить подкоренное выражение.</div>`;
                        simplified_Root1_in_numerator = simplifyExpression_basic(expression_with_fraction_numerator.bases[0]);
                        simplified2_in_numerator = simplifyExpression_basic(expression_with_fraction_numerator.remaining_Expression);
                        if (simplified_Root1_in_numerator.changing_exp) {
                            final_simplified_Root1_in_numerator = simplified_Root1_in_numerator.factorizedExpr;
                            renderedStep = format_Formula_For_MathJax(final_simplified_Root1_in_numerator);
                            html += `<div>Упрощённое подкроенное выражение имеет вид:</div>
                                <div class="mathjax-text">\\[${renderedStep}\\] </div>`;
                        } else {
                            final_simplified_Root1_in_numerator = expression_with_fraction_numerator.bases[0];
                            html += `<div><b>Подкоренное выражение не нуждается в упрощении.</b></div>`;
                        }

                        if (simplified2_in_numerator.changing_exp) {
                            final_simplified2_in_numerator = simplified2_in_numerator.factorizedExpr;
                            renderedStep = format_Formula_For_MathJax(final_simplified2_in_numerator);
                            html += `<div>Упрощённое выражение имеет вид:</div>
                                <div class="mathjax-text">\\[${renderedStep}\\] </div>`;
                        }
                        else {
                            final_simplified2_in_numerator = expression_with_fraction_numerator.remaining_Expression;
                            html += `<div><b>Выражение не нуждается в упрощении.</b></div>`;
                        }

                        full_Expression_numerator = `(${final_simplified2_in_numerator})${expression_with_fraction_numerator.signs[0]}(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})`
                        renderedStep = format_Formula_For_MathJax(full_Expression_numerator);
                        html += `<div>Итоговый числитель:</div>
                            <div class="mathjax-text">\\[${renderedStep}\\] </div>`;

                    } else {
                        html += `<div>В числителе исходной дроби присутствует корень. Попробуем упросить подкоренное выражение.</div>`;
                        simplified_Root1_in_numerator = simplifyExpression_basic(expression_with_fraction_numerator.bases[0]);
                        if (simplified_Root1_in_numerator.changing_exp) {
                            final_simplified_Root1_in_numerator = simplified_Root1_in_numerator.factorizedExpr;
                            renderedStep = format_Formula_For_MathJax(final_simplified_Root1_in_numerator);
                            html += `<div>Упрощённое подкроенное выражение имеет вид:</div>
                                <div class="mathjax-text">\\[${renderedStep}\\] </div>`;
                        } else {
                            final_simplified_Root1_in_numerator = expression_with_fraction_numerator.bases[0];
                            html += `<div><b>Подкоренное выражение не нуждается в упрощении.</b></div>`;
                        }

                        if (expression_with_fraction_numerator.signs[0] === '+') {
                            full_Expression_numerator = `(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})`;
                        }
                        else {
                            full_Expression_numerator = `${expression_with_fraction_numerator.signs[0]}(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})`;
                        }
                        renderedStep = format_Formula_For_MathJax(full_Expression_numerator);
                        html += `<div>Итоговый числитель:</div>
                            <div class="mathjax-text">\\[${renderedStep}\\] </div>`;
                    }
                }
            } else {
                html += `<div>В числителе исходной дроби корня нет. Попробуем упросить данное выражение.</div>`;
                simplified_Root1_in_numerator = simplifyExpression_basic(simplificationSteps.numerator);
                if (simplificationSteps.numerator === 'x' || simplificationSteps.numerator === '(x)') {
                    final_simplified_Root1_in_numerator = 'x';
                } else {
                    if (simplified_Root1_in_numerator.changing_exp) {
                        final_simplified_Root1_in_numerator = simplified_Root1_in_numerator.factorizedExpr;
                        renderedStep = format_Formula_For_MathJax(final_simplified_Root1_in_numerator);
                        html += `<div>Упрощённое выражение имеет вид:</div>
                                    <div class="mathjax-text">\\[${renderedStep}\\] </div>`;
                    } else {
                        let simplified_Root1_in_numerator_additionally = simplifyExpression_additionally(simplificationSteps.numerator);
                        example_changed = simplified_Root1_in_numerator_additionally.expression_changed;
                        if (example_changed) {
                            final_simplified_Root1_in_numerator = simplified_Root1_in_numerator_additionally.new_expression;
                            renderedStep = format_Formula_For_MathJax(final_simplified_Root1_in_numerator);
                            html += `<div>Упрощённое выражение имеет вид:</div>
                                    <div class="mathjax-text">\\[${renderedStep}\\] </div>`;
                        }
                        else {
                            final_simplified_Root1_in_numerator = simplificationSteps.factorizedNumeratorMsg;
                            html += `<div><b>Выражение не нуждается в упрощении.</b></div>`;
                        }
                    }
                }

                full_Expression_numerator = `(${final_simplified_Root1_in_numerator})`
                renderedStep = format_Formula_For_MathJax(full_Expression_numerator);
                html += `<div>Итоговый числитель:</div>
                            <div class="mathjax-text">\\[${renderedStep}\\] </div>`;

            }
            console.log(expression_with_fraction_denominator);
            if (expression_with_fraction_denominator.has_Root) {
                intermediate_variable_check = find_Roots(expression_with_fraction_denominator.remaining_Expression);
                if (intermediate_variable_check.has_Root) {
                    html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                    return html;
                } else {
                    number_roots_denominator = expression_with_fraction_denominator.bases.length;
                    if (number_roots_denominator >= 3) {
                        html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                        return html;
                    } else if (number_roots_denominator === 2 && expression_with_fraction_denominator.remaining_Expression !== "") {
                        html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                        return html;
                    } else if (number_roots_denominator === 2 && expression_with_fraction_denominator.remaining_Expression === "") {
                        html += `<div>В знаменателе исходной дроби присутствует два корня. Попробуем упросить оба подкоренных выражения:</div>`;
                        simplified_Root1_in_denominator = simplifyExpression_basic(expression_with_fraction_denominator.bases[0]);
                        simplified_Root2_in_denominator = simplifyExpression_basic(expression_with_fraction_denominator.bases[1]);
                        if (simplified_Root1_in_denominator.changing_exp) {
                            final_simplified_Root1_in_denominator = simplified_Root1_in_denominator.factorizedExpr;
                            renderedStep = format_Formula_For_MathJax(final_simplified_Root1_in_denominator);
                            html += `<div>Первое упрощённое подкроенное выражение имеет вид:</div>
                                <div class="mathjax-text">\\[${renderedStep}\\] </div>`;
                        } else {
                            final_simplified_Root1_in_denominator = expression_with_fraction_denominator.bases[0];
                            html += `<div><b>Первое подкоренное выражение не нуждается в упрощении.</b></div>`;
                        }

                        if (simplified_Root2_in_denominator.changing_exp) {
                            final_simplified_Root2_in_denominator = simplified_Root2_in_denominator.factorizedExpr;
                            renderedStep = format_Formula_For_MathJax(final_simplified_Root2_in_denominator);
                            html += `<div>Второе упрощённое подкроенное выражение имеет вид:</div>
                                <div class="mathjax-text">\\[${renderedStep}\\] </div>`;
                        } else {
                            final_simplified_Root2_in_denominator = expression_with_fraction_denominator.bases[1];
                            html += `<div><b>Второе подкоренное выражение не нуждается в упрощении.</b></div>`;
                        }

                        if (expression_with_fraction_denominator.signs[0] === '-' && expression_with_fraction_denominator.signs[1] === '+') {
                            full_Expression_denominator = `(${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]})${expression_with_fraction_denominator.signs[0]}(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})`
                            renderedStep = format_Formula_For_MathJax(full_Expression_denominator);
                            html += `<div>Итоговый знаменатель:</div>
                            <div class="mathjax-text">\\[${renderedStep}\\] </div>`;
                        } else if (expression_with_fraction_denominator.signs[0] === '+' && expression_with_fraction_denominator.signs[1] === '-') {
                            full_Expression_denominator = `(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})${expression_with_fraction_denominator.signs[1]}(${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]})`
                            renderedStep = format_Formula_For_MathJax(full_Expression_denominator);
                            html += `<div>Итоговый знаменатель:</div>
                            <div class="mathjax-text">\\[${renderedStep}\\] </div>`;
                        } else if (expression_with_fraction_denominator.signs[0] === '-' && expression_with_fraction_denominator.signs[1] === '-') {
                            full_Expression_denominator = `${expression_with_fraction_denominator.signs[0]}((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})+(${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))`
                            renderedStep = format_Formula_For_MathJax(full_Expression_denominator);
                            html += `<div>Итоговый знаменатель:</div>
                            <div class="mathjax-text">\\[${renderedStep}\\] </div>`;
                        } else if (expression_with_fraction_denominator.signs[0] === '+' && expression_with_fraction_denominator.signs[1] === '+') {
                            full_Expression_denominator = `(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})${expression_with_fraction_denominator.signs[0]}(${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]})`
                            renderedStep = format_Formula_For_MathJax(full_Expression_denominator);
                            html += `<div>Итоговый знаменатель:</div>
                            <div class="mathjax-text">\\[${renderedStep}\\] </div>`;
                        } else {
                            full_Expression_denominator = `${expression_with_fraction_denominator.signs[0]}(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})${expression_with_fraction_denominator.signs[1]}(${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]})`
                            renderedStep = format_Formula_For_MathJax(full_Expression_denominator);
                            html += `<div>Итоговый знаменатель:</div>
                            <div class="mathjax-text">\\[${renderedStep}\\] </div>`;
                        }

                    }
                    else if (number_roots_denominator === 1 && expression_with_fraction_denominator.remaining_Expression !== '0') {
                        html += `<div>В знаменателе исходной дроби присутствует корень. Попробуем упросить как подкоренное выражение, так и оставшееся. Для начала попытаемся упростить подкоренное выражение.</div>`;
                        simplified_Root1_in_denominator = simplifyExpression_basic(expression_with_fraction_denominator.bases[0]);
                        simplified2_in_denominator = simplifyExpression_basic(expression_with_fraction_denominator.remaining_Expression);
                        if (simplified_Root1_in_denominator.changing_exp) {
                            final_simplified_Root1_in_denominator = simplified_Root1_in_denominator.factorizedExpr;
                            renderedStep = format_Formula_For_MathJax(final_simplified_Root1_in_denominator);
                            html += `<div>Упрощённое подкроенное выражение имеет вид:</div>
                                <div class="mathjax-text">\\[${renderedStep}\\] </div>`;
                        } else {
                            final_simplified_Root1_in_denominator = expression_with_fraction_denominator.bases[0];
                            html += `<div><b>Подкоренное выражение не нуждается в упрощении.</b></div>`;
                        }

                        if (simplified2_in_denominator.changing_exp) {
                            final_simplified2_in_denominator = simplified2_in_denominator.factorizedExpr;
                            renderedStep = format_Formula_For_MathJax(final_simplified2_in_denominator);
                            html += `<div>Упрощённое выражение имеет вид:</div>
                                <div class="mathjax-text">\\[${renderedStep}\\] </div>`;
                        } else {
                            final_simplified2_in_denominator = expression_with_fraction_denominator.remaining_Expression;
                            html += `<div><b>Выражение не нуждается в упрощении.</b></div>`;
                        }

                        full_Expression_denominator = `(${final_simplified2_in_denominator})${expression_with_fraction_denominator.signs[0]}(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})`
                        renderedStep = format_Formula_For_MathJax(full_Expression_denominator);
                        html += `<div>Итоговый знаменатель:</div>
                            <div class="mathjax-text">\\[${renderedStep}\\] </div>`;

                    } else {
                        html += `<div>В знаменателе исходной дроби присутствует корень. Попробуем упросить подкоренное выражение.</div>`;
                        simplified_Root1_in_denominator = simplifyExpression_basic(expression_with_fraction_denominator.bases[0]);
                        if (simplified_Root1_in_denominator.changing_exp) {
                            final_simplified_Root1_in_denominator = simplified_Root1_in_denominator.factorizedExpr;
                            renderedStep = format_Formula_For_MathJax(final_simplified_Root1_in_denominator);
                            html += `<div>Упрощённое подкроенное выражение имеет вид:</div>
                                <div class="mathjax-text">\\[${renderedStep}\\] </div>`;
                        } else {
                            final_simplified_Root1_in_denominator = expression_with_fraction_denominator.bases[0];
                            html += `<div><b>Подкоренное выражение не нуждается в упрощении.</b></div>`;
                        }

                        if (expression_with_fraction_denominator.signs[0] === '+') {
                            full_Expression_denominator = `(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})`;
                        }
                        else {
                            full_Expression_denominator = `${expression_with_fraction_denominator.signs[0]}(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})`
                        }

                        renderedStep = format_Formula_For_MathJax(full_Expression_denominator);
                        html += `<div>Итоговый знаменатель:</div>
                            <div class="mathjax-text">\\[${renderedStep}\\] </div>`;

                    }
                }
            } else {
                html += `<div>В знаменателе исходной дроби корня нет. Попробуем упросить данное выражение.</div>`;
                simplified_Root1_in_denominator = simplifyExpression_basic(simplificationSteps.denominator);
                if (simplificationSteps.denominator === 'x' || simplificationSteps.denominator === '(x)') {
                    final_simplified_Root1_in_denominator = 'x';
                } else {
                    console.log(simplified_Root1_in_denominator);
                    if (simplified_Root1_in_denominator.changing_exp) {
                        final_simplified_Root1_in_denominator = simplified_Root1_in_denominator.factorizedExpr;
                        renderedStep = format_Formula_For_MathJax(final_simplified_Root1_in_denominator);
                        html += `<div>Упрощённое выражение имеет вид:</div>
                                <div class="mathjax-text">\\[${renderedStep}\\] </div>`;
                    } else {
                        let simplified_Root1_in_denominator_additionally = simplifyExpression_additionally(simplificationSteps.denominator);
                        example_changed = simplified_Root1_in_denominator_additionally.expression_changed;
                        if (example_changed) {
                            final_simplified_Root1_in_denominator = simplified_Root1_in_denominator_additionally.new_expression;
                            renderedStep = format_Formula_For_MathJax(final_simplified_Root1_in_denominator);
                            html += `<div>Упрощённое выражение имеет вид:</div>
                                <div class="mathjax-text">\\[${renderedStep}\\] </div>`;
                        }
                        else {
                            final_simplified_Root1_in_denominator = simplificationSteps.factorizedDenominatorMsg;
                            html += `<div><b>Выражение не нуждается в упрощении.</b></div>`;
                        }
                    }
                }
                full_Expression_denominator = `(${final_simplified_Root1_in_denominator})`;
                renderedStep = format_Formula_For_MathJax(full_Expression_denominator);
                html += `<div>Итоговый знаменатель:</div>
                            <div class="mathjax-text">\\[${renderedStep}\\] </div>`;
            }
            

            if (expression_with_fraction_numerator.has_Root && expression_with_fraction_denominator.has_Root) {
                html += `<div>Как можем заметить, корни пристутствуют как в числителе, так и в знаменателе. Рассмотрим степень или степени корней в числителе (если это целесообразно) и выведем сопряжённое выражение.</div>`;

                //числитель
                if (expression_with_fraction_numerator.bases.length === 2) {
                    if (expression_with_fraction_numerator.numerators[0] === '1' && expression_with_fraction_numerator.numerators[1] === '1') {
                        if (expression_with_fraction_numerator.denominators[0] === '2' && expression_with_fraction_numerator.denominators[1] === '2') {
                            html += `<div>Степени корней в числителе равны двум, следовательно необходимо применить такую формулу сокращённого умножения, как разность квадратов: a<sup>2</sup>-b<sup>2</sup>=(a-b)(a+b).</div>`;
                            if (expression_with_fraction_numerator.signs[0] === '-' && expression_with_fraction_numerator.signs[1] === '+') {
                                full_Expression_numerator_dop = `(${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]})+(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})`;
                                full_Expression_numerator_final = `(${final_simplified_Root2_in_numerator})-(${final_simplified_Root1_in_numerator})`;
                            } else if (expression_with_fraction_numerator.signs[0] === '+' && expression_with_fraction_numerator.signs[1] === '-') {
                                full_Expression_numerator_dop = `(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})+(${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]})`;
                                full_Expression_numerator_final = `(${final_simplified_Root1_in_numerator})-(${final_simplified_Root2_in_numerator})`;
                            } else if (expression_with_fraction_numerator.signs[0] === '-' && expression_with_fraction_numerator.signs[1] === '-') {
                                full_Expression_numerator_dop = `(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})-(${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]})`;
                                full_Expression_numerator_final = `-((${final_simplified_Root1_in_numerator})-(${final_simplified_Root2_in_numerator}))`;
                            } else if (expression_with_fraction_numerator.signs[0] === '+' && expression_with_fraction_numerator.signs[1] === '+') {
                                full_Expression_numerator_dop = `(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})-(${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]})`;
                                full_Expression_numerator_final = `(${final_simplified_Root1_in_numerator})-(${final_simplified_Root2_in_numerator})`;
                            } else if (full_Expression_numerator === `${expression_with_fraction_numerator.signs[0]}(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})${expression_with_fraction_numerator.signs[0]}(${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]})`) {
                                if (expression_with_fraction_numerator.signs[0] === '+' && expression_with_fraction_numerator.signs[1] === '-') {
                                    full_Expression_numerator_dop = `(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})+(${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]})`;
                                    full_Expression_numerator_final = `(${final_simplified_Root1_in_numerator})-(${final_simplified_Root2_in_numerator})`;
                                } else if (expression_with_fraction_numerator.signs[0] === '-' && expression_with_fraction_numerator.signs[1] === '+') {
                                    full_Expression_numerator_dop = `(${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]})+(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})`;
                                    full_Expression_numerator_final = `(${final_simplified_Root2_in_numerator})-(${final_simplified_Root1_in_numerator})`;
                                } else {
                                    html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                    return html;
                                }
                            } else {
                                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                return html;
                            }

                        } else if (expression_with_fraction_numerator.denominators[0] === '3' && expression_with_fraction_numerator.denominators[1] === '3') {
                            html += `<div>Степени корней в числителе равны трём, следовательно необходимо применить такие формулы сокращённого умножения, как разность или сумма кубов (в зависимости от знака между корнями): a<sup>3</sup>-b<sup>3</sup>=(a-b)(a<sup>2</sup>+a*b+b<sup>2</sup>) или a<sup>3</sup>+b<sup>3</sup>=(a+b)(a<sup>2</sup>-a*b+b<sup>2</sup>) соотственно.</div>`;
                            if (expression_with_fraction_numerator.signs[0] === '-' && expression_with_fraction_numerator.signs[1] === '+') {
                                full_Expression_numerator_dop = `((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^2+((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))*((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))+((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2`;
                                full_Expression_numerator_final = `(${final_simplified_Root2_in_numerator})-(${final_simplified_Root1_in_numerator})`;
                            } else if (expression_with_fraction_numerator.signs[0] === '+' && expression_with_fraction_numerator.signs[1] === '-') {
                                full_Expression_numerator_dop = `((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2+((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))*((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))+((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^2`;
                                full_Expression_numerator_final = `(${final_simplified_Root1_in_numerator})-(${final_simplified_Root2_in_numerator})`;
                            } else if (expression_with_fraction_numerator.signs[0] === '-' && expression_with_fraction_numerator.signs[1] === '-') {
                                full_Expression_numerator_dop = `((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2-((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))*((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))+((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^2`;
                                full_Expression_numerator_final = `-((${final_simplified_Root1_in_numerator})+(${final_simplified_Root2_in_numerator}))`;
                            } else if (expression_with_fraction_numerator.signs[0] === '+' && expression_with_fraction_numerator.signs[1] === '+') {
                                full_Expression_numerator_dop = `((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2-((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))*((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))+((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^2`;
                                full_Expression_numerator_final = `(${final_simplified_Root1_in_numerator})+(${final_simplified_Root2_in_numerator})`;
                            } else if (full_Expression_numerator === `${expression_with_fraction_numerator.signs[0]}(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})${expression_with_fraction_numerator.signs[0]}(${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]})`) {
                                if (expression_with_fraction_numerator.signs[0] === '+' && expression_with_fraction_numerator.signs[1] === '-') {
                                    full_Expression_numerator_dop = `((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2+((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))*((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))+((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^2`;
                                    full_Expression_numerator_final = `(${final_simplified_Root1_in_numerator})-(${final_simplified_Root2_in_numerator})`;
                                } else if (expression_with_fraction_numerator.signs[0] === '-' && expression_with_fraction_numerator.signs[1] === '+') {
                                    full_Expression_numerator_dop = `((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^2+((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))*((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))+((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2`;
                                    full_Expression_numerator_final = `(${final_simplified_Root2_in_numerator})-(${final_simplified_Root1_in_numerator})`;
                                } else {
                                    html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                    return html;
                                }
                            } else {
                                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                return html;
                            }
                        } else if (expression_with_fraction_numerator.denominators[0] === '4' && expression_with_fraction_numerator.denominators[1] === '4') {
                            html += `<div>Степени корней в числителе равны четырём, следовательно необходимо применить такую формулу сокращённого умножения, как: a<sup>4</sup>-b<sup>4</sup>=(a-b)(a<sup>3</sup>+a<sup>2</sup>*b+a*b<sup>2</sup>+b<sup>3</sup>).</div>`;
                            if (expression_with_fraction_numerator.signs[0] === '-' && expression_with_fraction_numerator.signs[1] === '+') {
                                full_Expression_numerator_dop = `((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^3+(((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^2)*((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))+((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))*(((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2)+((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^3`;
                                full_Expression_numerator_final = `(${final_simplified_Root2_in_numerator})-(${final_simplified_Root1_in_numerator})`;
                            } else if (expression_with_fraction_numerator.signs[0] === '+' && expression_with_fraction_numerator.signs[1] === '-') {
                                full_Expression_numerator_dop = `((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^3+(((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2)*((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))+((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))*(((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^2)+((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^3`;
                                full_Expression_numerator_final = `(${final_simplified_Root1_in_numerator})-(${final_simplified_Root2_in_numerator})`;
                            } else if (expression_with_fraction_numerator.signs[0] === '-' && expression_with_fraction_numerator.signs[1] === '-') {
                                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                return html;
                            } else if (expression_with_fraction_numerator.signs[0] === '+' && expression_with_fraction_numerator.signs[1] === '+') {
                                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                return html;
                            } else if (full_Expression_numerator === `${expression_with_fraction_numerator.signs[0]}(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})${expression_with_fraction_numerator.signs[0]}(${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]})`) {
                                if (expression_with_fraction_numerator.signs[0] === '+' && expression_with_fraction_numerator.signs[1] === '-') {
                                    full_Expression_numerator_dop = `((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^3+(((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2)*((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))+((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))*(((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^2)+((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^3`;
                                    full_Expression_numerator_final = `(${final_simplified_Root1_in_numerator})-(${final_simplified_Root2_in_numerator})`;
                                } else if (expression_with_fraction_numerator.signs[0] === '-' && expression_with_fraction_numerator.signs[1] === '+') {
                                    full_Expression_numerator_dop = `((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^3+(((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^2)*((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))+((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))*(((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2)+((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^3`;
                                    full_Expression_numerator_final = `(${final_simplified_Root2_in_numerator})-(${final_simplified_Root1_in_numerator})`;
                                } else {
                                    html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                    return html;
                                }
                            } else {
                                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                return html;
                            }
                        } else {
                            html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                            return html;
                        }
                    } else if (expression_with_fraction_numerator.numerators[0] === '1') {
                        if (expression_with_fraction_numerator.denominators[0] === '2' && expression_with_fraction_numerator.denominators[1] === '2') {
                            html += `<div>Степени корней в числителе равны двум, следовательно необходимо применить такую формулу сокращённого умножения, как разность квадратов: a<sup>2</sup>-b<sup>2</sup>=(a-b)(a+b).</div>`;
                            if (expression_with_fraction_numerator.signs[0] === '-' && expression_with_fraction_numerator.signs[1] === '+') {
                                full_Expression_numerator_dop = `(${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]})+(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})`;
                                full_Expression_numerator_final = `(${final_simplified_Root2_in_numerator})^${expression_with_fraction_numerator.numerators[1]}-(${final_simplified_Root1_in_numerator})`;
                            } else if (expression_with_fraction_numerator.signs[0] === '+' && expression_with_fraction_numerator.signs[1] === '-') {
                                full_Expression_numerator_dop = `(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})+(${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]})`;
                                full_Expression_numerator_final = `(${final_simplified_Root1_in_numerator})-(${final_simplified_Root2_in_numerator})^${expression_with_fraction_numerator.numerators[1]}`;
                            } else if (expression_with_fraction_numerator.signs[0] === '-' && expression_with_fraction_numerator.signs[1] === '-') {
                                full_Expression_numerator_dop = `(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})-(${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]})`;
                                full_Expression_numerator_final = `-((${final_simplified_Root1_in_numerator})-(${final_simplified_Root2_in_numerator})^${expression_with_fraction_numerator.numerators[1]})`;
                            } else if (expression_with_fraction_numerator.signs[0] === '+' && expression_with_fraction_numerator.signs[1] === '+') {
                                full_Expression_numerator_dop = `(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})-(${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]})`;
                                full_Expression_numerator_final = `(${final_simplified_Root1_in_numerator})-(${final_simplified_Root2_in_numerator})^${expression_with_fraction_numerator.numerators[1]}`;
                            } else if (full_Expression_numerator === `${expression_with_fraction_numerator.signs[0]}(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})${expression_with_fraction_numerator.signs[0]}(${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]})`) {
                                if (expression_with_fraction_numerator.signs[0] === '+' && expression_with_fraction_numerator.signs[1] === '-') {
                                    full_Expression_numerator_dop = `(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})+(${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]})`;
                                    full_Expression_numerator_final = `(${final_simplified_Root1_in_numerator})-(${final_simplified_Root2_in_numerator})^${expression_with_fraction_numerator.numerators[1]}`;
                                } else if (expression_with_fraction_numerator.signs[0] === '-' && expression_with_fraction_numerator.signs[1] === '+') {
                                    full_Expression_numerator_dop = `(${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]})+(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})`;
                                    full_Expression_numerator_final = `(${final_simplified_Root2_in_numerator})^${expression_with_fraction_numerator.numerators[1]}-(${final_simplified_Root1_in_numerator})`;
                                } else {
                                    html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                    return html;
                                }
                            } else {
                                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                return html;
                            }

                        } else if (expression_with_fraction_numerator.denominators[0] === '3' && expression_with_fraction_numerator.denominators[1] === '3') {
                            html += `<div>Степени корней в числителе равны трём, следовательно необходимо применить такие формулы сокращённого умножения, как разность или сумма кубов (в зависимости от знака между корнями): a<sup>3</sup>-b<sup>3</sup>=(a-b)(a<sup>2</sup>+a*b+b<sup>2</sup>) или a<sup>3</sup>+b<sup>3</sup>=(a+b)(a<sup>2</sup>-a*b+b<sup>2</sup>) соотственно.</div>`;
                            if (expression_with_fraction_numerator.signs[0] === '-' && expression_with_fraction_numerator.signs[1] === '+') {
                                full_Expression_numerator_dop = `((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^2+((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))*((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))+((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2`;
                                full_Expression_numerator_final = `(${final_simplified_Root2_in_numerator})^${expression_with_fraction_numerator.numerators[1]}-(${final_simplified_Root1_in_numerator})`;
                            } else if (expression_with_fraction_numerator.signs[0] === '+' && expression_with_fraction_numerator.signs[1] === '-') {
                                full_Expression_numerator_dop = `((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2+((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))*((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))+((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^2`;
                                full_Expression_numerator_final = `(${final_simplified_Root1_in_numerator})-(${final_simplified_Root2_in_numerator})^${expression_with_fraction_numerator.numerators[1]}`;
                            } else if (expression_with_fraction_numerator.signs[0] === '-' && expression_with_fraction_numerator.signs[1] === '-') {
                                full_Expression_numerator_dop = `((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2-((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))*((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))+((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^2`;
                                full_Expression_numerator_final = `-((${final_simplified_Root1_in_numerator})+(${final_simplified_Root2_in_numerator})^${expression_with_fraction_numerator.numerators[1]})`;
                            } else if (expression_with_fraction_numerator.signs[0] === '+' && expression_with_fraction_numerator.signs[1] === '+') {
                                full_Expression_numerator_dop = `((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2-((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))*((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))+((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^2`;
                                full_Expression_numerator_final = `(${final_simplified_Root1_in_numerator})+(${final_simplified_Root2_in_numerator})^${expression_with_fraction_numerator.numerators[1]}`;
                            } else if (full_Expression_numerator === `${expression_with_fraction_numerator.signs[0]}(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})${expression_with_fraction_numerator.signs[0]}(${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]})`) {
                                if (expression_with_fraction_numerator.signs[0] === '+' && expression_with_fraction_numerator.signs[1] === '-') {
                                    full_Expression_numerator_dop = `((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2+((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))*((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))+((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^2`;
                                    full_Expression_numerator_final = `(${final_simplified_Root1_in_numerator})-(${final_simplified_Root2_in_numerator})^${expression_with_fraction_numerator.numerators[1]}`;
                                } else if (expression_with_fraction_numerator.signs[0] === '-' && expression_with_fraction_numerator.signs[1] === '+') {
                                    full_Expression_numerator_dop = `((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^2+((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))*((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))+((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2`;
                                    full_Expression_numerator_final = `(${final_simplified_Root2_in_numerator})^${expression_with_fraction_numerator.numerators[1]}-(${final_simplified_Root1_in_numerator})`;
                                } else {
                                    html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                    return html;
                                }
                            } else {
                                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                return html;
                            }
                        } else if (expression_with_fraction_numerator.denominators[0] === '4' && expression_with_fraction_numerator.denominators[1] === '4') {
                            html += `<div>Степени корней в числителе равны четырём, следовательно необходимо применить такую формулу сокращённого умножения, как: a<sup>4</sup>-b<sup>4</sup>=(a-b)(a<sup>3</sup>+a<sup>2</sup>*b+a*b<sup>2</sup>+b<sup>3</sup>).</div>`;
                            if (expression_with_fraction_numerator.signs[0] === '-' && expression_with_fraction_numerator.signs[1] === '+') {
                                full_Expression_numerator_dop = `((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^3+(((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^2)*((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))+((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))*(((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2)+((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^3`;
                                full_Expression_numerator_final = `(${final_simplified_Root2_in_numerator})^${expression_with_fraction_numerator.numerators[1]}-(${final_simplified_Root1_in_numerator})`;
                            } else if (expression_with_fraction_numerator.signs[0] === '+' && expression_with_fraction_numerator.signs[1] === '-') {
                                full_Expression_numerator_dop = `((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^3+(((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2)*((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))+((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))*(((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^2)+((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^3`;
                                full_Expression_numerator_final = `(${final_simplified_Root1_in_numerator})-(${final_simplified_Root2_in_numerator})^${expression_with_fraction_numerator.numerators[1]}`;
                            } else if (expression_with_fraction_numerator.signs[0] === '-' && expression_with_fraction_numerator.signs[1] === '-') {
                                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                return html;
                            } else if (expression_with_fraction_numerator.signs[0] === '+' && expression_with_fraction_numerator.signs[1] === '+') {
                                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                return html;
                            } else if (full_Expression_numerator === `${expression_with_fraction_numerator.signs[0]}(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})${expression_with_fraction_numerator.signs[0]}(${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]})`) {
                                if (expression_with_fraction_numerator.signs[0] === '+' && expression_with_fraction_numerator.signs[1] === '-') {
                                    full_Expression_numerator_dop = `((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^3+(((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2)*((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))+((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))*(((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^2)+((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^3`;
                                    full_Expression_numerator_final = `(${final_simplified_Root1_in_numerator})-(${final_simplified_Root2_in_numerator})^${expression_with_fraction_numerator.numerators[1]}`;
                                } else if (expression_with_fraction_numerator.signs[0] === '-' && expression_with_fraction_numerator.signs[1] === '+') {
                                    full_Expression_numerator_dop = `((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^3+(((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^2)*((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))+((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))*(((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2)+((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^3`;
                                    full_Expression_numerator_final = `(${final_simplified_Root2_in_numerator})^${expression_with_fraction_numerator.numerators[1]}-(${final_simplified_Root1_in_numerator})`;
                                } else {
                                    html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                    return html;
                                }
                            } else {
                                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                return html;
                            }
                        } else {
                            html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                            return html;
                        }
                    } else if (expression_with_fraction_numerator.numerators[1] === '1') {
                        if (expression_with_fraction_numerator.denominators[0] === '2' && expression_with_fraction_numerator.denominators[1] === '2') {
                            html += `<div>Степени корней в числителе равны двум, следовательно необходимо применить такую формулу сокращённого умножения, как разность квадратов: a<sup>2</sup>-b<sup>2</sup>=(a-b)(a+b).</div>`;
                            if (expression_with_fraction_numerator.signs[0] === '-' && expression_with_fraction_numerator.signs[1] === '+') {
                                full_Expression_numerator_dop = `(${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]})+(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})`;
                                full_Expression_numerator_final = `(${final_simplified_Root2_in_numerator})-(${final_simplified_Root1_in_numerator})^${expression_with_fraction_numerator.numerators[0]}`;
                            } else if (expression_with_fraction_numerator.signs[0] === '+' && expression_with_fraction_numerator.signs[1] === '-') {
                                full_Expression_numerator_dop = `(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})+(${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]})`;
                                full_Expression_numerator_final = `(${final_simplified_Root1_in_numerator})^${expression_with_fraction_numerator.numerators[0]}-(${final_simplified_Root2_in_numerator})`;
                            } else if (expression_with_fraction_numerator.signs[0] === '-' && expression_with_fraction_numerator.signs[1] === '-') {
                                full_Expression_numerator_dop = `(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})-(${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]})`;
                                full_Expression_numerator_final = `-((${final_simplified_Root1_in_numerator})^${expression_with_fraction_numerator.numerators[0]}-(${final_simplified_Root2_in_numerator})`;
                            } else if (expression_with_fraction_numerator.signs[0] === '+' && expression_with_fraction_numerator.signs[1] === '+') {
                                full_Expression_numerator_dop = `(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})-(${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]})`;
                                full_Expression_numerator_final = `(${final_simplified_Root1_in_numerator})^${expression_with_fraction_numerator.numerators[0]}-(${final_simplified_Root2_in_numerator})`;
                            } else if (full_Expression_numerator === `${expression_with_fraction_numerator.signs[0]}(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})${expression_with_fraction_numerator.signs[0]}(${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]})`) {
                                if (expression_with_fraction_numerator.signs[0] === '+' && expression_with_fraction_numerator.signs[1] === '-') {
                                    full_Expression_numerator_dop = `(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})+(${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]})`;
                                    full_Expression_numerator_final = `(${final_simplified_Root1_in_numerator})^${expression_with_fraction_numerator.numerators[0]}-(${final_simplified_Root2_in_numerator})`;
                                } else if (expression_with_fraction_numerator.signs[0] === '-' && expression_with_fraction_numerator.signs[1] === '+') {
                                    full_Expression_numerator_dop = `(${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]})+(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})`;
                                    full_Expression_numerator_final = `(${final_simplified_Root2_in_numerator})-(${final_simplified_Root1_in_numerator})^${expression_with_fraction_numerator.numerators[0]}`;
                                } else {
                                    html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                    return html;
                                }
                            } else {
                                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                return html;
                            }

                        } else if (expression_with_fraction_numerator.denominators[0] === '3' && expression_with_fraction_numerator.denominators[1] === '3') {
                            html += `<div>Степени корней в числителе равны трём, следовательно необходимо применить такие формулы сокращённого умножения, как разность или сумма кубов (в зависимости от знака между корнями): a<sup>3</sup>-b<sup>3</sup>=(a-b)(a<sup>2</sup>+a*b+b<sup>2</sup>) или a<sup>3</sup>+b<sup>3</sup>=(a+b)(a<sup>2</sup>-a*b+b<sup>2</sup>) соотственно.</div>`;
                            if (expression_with_fraction_numerator.signs[0] === '-' && expression_with_fraction_numerator.signs[1] === '+') {
                                full_Expression_numerator_dop = `((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^2+((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))*((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))+((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2`;
                                full_Expression_numerator_final = `(${final_simplified_Root2_in_numerator})-(${final_simplified_Root1_in_numerator})^${expression_with_fraction_numerator.numerators[0]}`;
                            } else if (expression_with_fraction_numerator.signs[0] === '+' && expression_with_fraction_numerator.signs[1] === '-') {
                                full_Expression_numerator_dop = `((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2+((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))*((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))+((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^2`;
                                full_Expression_numerator_final = `(${final_simplified_Root1_in_numerator})^${expression_with_fraction_numerator.numerators[0]}-(${final_simplified_Root2_in_numerator})`;
                            } else if (expression_with_fraction_numerator.signs[0] === '-' && expression_with_fraction_numerator.signs[1] === '-') {
                                full_Expression_numerator_dop = `((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2-((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))*((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))+((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^2`;
                                full_Expression_numerator_final = `-((${final_simplified_Root1_in_numerator})^${expression_with_fraction_numerator.numerators[0]}+(${final_simplified_Root2_in_numerator})`;
                            } else if (expression_with_fraction_numerator.signs[0] === '+' && expression_with_fraction_numerator.signs[1] === '+') {
                                full_Expression_numerator_dop = `((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2-((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))*((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))+((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^2`;
                                full_Expression_numerator_final = `(${final_simplified_Root1_in_numerator})^${expression_with_fraction_numerator.numerators[0]}+(${final_simplified_Root2_in_numerator})`;
                            } else if (full_Expression_numerator === `${expression_with_fraction_numerator.signs[0]}(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})${expression_with_fraction_numerator.signs[0]}(${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]})`) {
                                if (expression_with_fraction_numerator.signs[0] === '+' && expression_with_fraction_numerator.signs[1] === '-') {
                                    full_Expression_numerator_dop = `((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2+((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))*((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))+((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^2`;
                                    full_Expression_numerator_final = `(${final_simplified_Root1_in_numerator})^${expression_with_fraction_numerator.numerators[0]}-(${final_simplified_Root2_in_numerator})`;
                                } else if (expression_with_fraction_numerator.signs[0] === '-' && expression_with_fraction_numerator.signs[1] === '+') {
                                    full_Expression_numerator_dop = `((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^2+((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))*((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))+((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2`;
                                    full_Expression_numerator_final = `(${final_simplified_Root2_in_numerator})-(${final_simplified_Root1_in_numerator})^${expression_with_fraction_numerator.numerators[0]}`;
                                } else {
                                    html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                    return html;
                                }
                            } else {
                                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                return html;
                            }
                        } else if (expression_with_fraction_numerator.denominators[0] === '4' && expression_with_fraction_numerator.denominators[1] === '4') {
                            html += `<div>Степени корней в числителе равны четырём, следовательно необходимо применить такую формулу сокращённого умножения, как: a<sup>4</sup>-b<sup>4</sup>=(a-b)(a<sup>3</sup>+a<sup>2</sup>*b+a*b<sup>2</sup>+b<sup>3</sup>).</div>`;
                            if (expression_with_fraction_numerator.signs[0] === '-' && expression_with_fraction_numerator.signs[1] === '+') {
                                full_Expression_numerator_dop = `((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^3+(((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^2)*((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))+((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))*(((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2)+((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^3`;
                                full_Expression_numerator_final = `(${final_simplified_Root2_in_numerator})-(${final_simplified_Root1_in_numerator})^${expression_with_fraction_numerator.numerators[0]}`;
                            } else if (expression_with_fraction_numerator.signs[0] === '+' && expression_with_fraction_numerator.signs[1] === '-') {
                                full_Expression_numerator_dop = `((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^3+(((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2)*((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))+((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))*(((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^2)+((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^3`;
                                full_Expression_numerator_final = `(${final_simplified_Root1_in_numerator})^${expression_with_fraction_numerator.numerators[0]}-(${final_simplified_Root2_in_numerator})`;
                            } else if (expression_with_fraction_numerator.signs[0] === '-' && expression_with_fraction_numerator.signs[1] === '-') {
                                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                return html;
                            } else if (expression_with_fraction_numerator.signs[0] === '+' && expression_with_fraction_numerator.signs[1] === '+') {
                                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                return html;
                            } else if (full_Expression_numerator === `${expression_with_fraction_numerator.signs[0]}(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})${expression_with_fraction_numerator.signs[0]}(${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]})`) {
                                if (expression_with_fraction_numerator.signs[0] === '+' && expression_with_fraction_numerator.signs[1] === '-') {
                                    full_Expression_numerator_dop = `((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^3+(((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2)*((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))+((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))*(((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^2)+((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^3`;
                                    full_Expression_numerator_final = `(${final_simplified_Root1_in_numerator})^${expression_with_fraction_numerator.numerators[0]}-(${final_simplified_Root2_in_numerator})`;
                                } else if (expression_with_fraction_numerator.signs[0] === '-' && expression_with_fraction_numerator.signs[1] === '+') {
                                    full_Expression_numerator_dop = `((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^3+(((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^2)*((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))+((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))*(((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2)+((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^3`;
                                    full_Expression_numerator_final = `(${final_simplified_Root2_in_numerator})-(${final_simplified_Root1_in_numerator})^${expression_with_fraction_numerator.numerators[0]}`;
                                } else {
                                    html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                    return html;
                                }
                            } else {
                                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                return html;
                            }
                        } else {
                            html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                            return html;
                        }
                    } else {
                        if (expression_with_fraction_numerator.denominators[0] === '2' && expression_with_fraction_numerator.denominators[1] === '2') {
                            html += `<div>Степени корней в числителе равны двум, следовательно необходимо применить такую формулу сокращённого умножения, как разность квадратов: a<sup>2</sup>-b<sup>2</sup>=(a-b)(a+b).</div>`;
                            if (expression_with_fraction_numerator.signs[0] === '-' && expression_with_fraction_numerator.signs[1] === '+') {
                                full_Expression_numerator_dop = `(${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]})+(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})`;
                                full_Expression_numerator_final = `(${final_simplified_Root2_in_numerator})^${expression_with_fraction_numerator.numerators[1]}-(${final_simplified_Root1_in_numerator})^${expression_with_fraction_numerator.numerators[0]}`;
                            } else if (expression_with_fraction_numerator.signs[0] === '+' && expression_with_fraction_numerator.signs[1] === '-') {
                                full_Expression_numerator_dop = `(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})+(${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]})`;
                                full_Expression_numerator_final = `(${final_simplified_Root1_in_numerator})^${expression_with_fraction_numerator.numerators[0]}-(${final_simplified_Root2_in_numerator})^${expression_with_fraction_numerator.numerators[1]}`;
                            } else if (expression_with_fraction_numerator.signs[0] === '-' && expression_with_fraction_numerator.signs[1] === '-') {
                                full_Expression_numerator_dop = `(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})-(${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]})`;
                                full_Expression_numerator_final = `-((${final_simplified_Root1_in_numerator})^${expression_with_fraction_numerator.numerators[0]}-(${final_simplified_Root2_in_numerator})^${expression_with_fraction_numerator.numerators[1]})`;
                            } else if (expression_with_fraction_numerator.signs[0] === '+' && expression_with_fraction_numerator.signs[1] === '+') {
                                full_Expression_numerator_dop = `(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})-(${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]})`;
                                full_Expression_numerator_final = `(${final_simplified_Root1_in_numerator})^${expression_with_fraction_numerator.numerators[0]}-(${final_simplified_Root2_in_numerator})^${expression_with_fraction_numerator.numerators[1]}`;
                            } else if (full_Expression_numerator === `${expression_with_fraction_numerator.signs[0]}(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})${expression_with_fraction_numerator.signs[0]}(${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]})`) {
                                if (expression_with_fraction_numerator.signs[0] === '+' && expression_with_fraction_numerator.signs[1] === '-') {
                                    full_Expression_numerator_dop = `(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})+(${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]})`;
                                    full_Expression_numerator_final = `(${final_simplified_Root1_in_numerator})^${expression_with_fraction_numerator.numerators[0]}-(${final_simplified_Root2_in_numerator})^${expression_with_fraction_numerator.numerators[1]}`;
                                } else if (expression_with_fraction_numerator.signs[0] === '-' && expression_with_fraction_numerator.signs[1] === '+') {
                                    full_Expression_numerator_dop = `(${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]})+(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})`;
                                    full_Expression_numerator_final = `(${final_simplified_Root2_in_numerator})^${expression_with_fraction_numerator.numerators[1]}-(${final_simplified_Root1_in_numerator})^${expression_with_fraction_numerator.numerators[0]}`;
                                } else {
                                    html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                    return html;
                                }
                            } else {
                                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                return html;
                            }

                        } else if (expression_with_fraction_numerator.denominators[0] === '3' && expression_with_fraction_numerator.denominators[1] === '3') {
                            html += `<div>Степени корней в числителе равны трём, следовательно необходимо применить такие формулы сокращённого умножения, как разность или сумма кубов (в зависимости от знака между корнями): a<sup>3</sup>-b<sup>3</sup>=(a-b)(a<sup>2</sup>+a*b+b<sup>2</sup>) или a<sup>3</sup>+b<sup>3</sup>=(a+b)(a<sup>2</sup>-a*b+b<sup>2</sup>) соотственно.</div>`;
                            if (expression_with_fraction_numerator.signs[0] === '-' && expression_with_fraction_numerator.signs[1] === '+') {
                                full_Expression_numerator_dop = `((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^2+((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))*((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))+((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2`;
                                full_Expression_numerator_final = `(${final_simplified_Root2_in_numerator})^${expression_with_fraction_numerator.numerators[1]}-(${final_simplified_Root1_in_numerator})^${expression_with_fraction_numerator.numerators[0]}`;
                            } else if (expression_with_fraction_numerator.signs[0] === '+' && expression_with_fraction_numerator.signs[1] === '-') {
                                full_Expression_numerator_dop = `((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2+((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))*((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))+((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^2`;
                                full_Expression_numerator_final = `(${final_simplified_Root1_in_numerator})^${expression_with_fraction_numerator.numerators[0]}-(${final_simplified_Root2_in_numerator})^${expression_with_fraction_numerator.numerators[1]}`;
                            } else if (expression_with_fraction_numerator.signs[0] === '-' && expression_with_fraction_numerator.signs[1] === '-') {
                                full_Expression_numerator_dop = `((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2-((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))*((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))+((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^2`;
                                full_Expression_numerator_final = `-((${final_simplified_Root1_in_numerator})^${expression_with_fraction_numerator.numerators[0]}+(${final_simplified_Root2_in_numerator})^${expression_with_fraction_numerator.numerators[1]})`;
                            } else if (expression_with_fraction_numerator.signs[0] === '+' && expression_with_fraction_numerator.signs[1] === '+') {
                                full_Expression_numerator_dop = `((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2-((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))*((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))+((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^2`;
                                full_Expression_numerator_final = `(${final_simplified_Root1_in_numerator})^${expression_with_fraction_numerator.numerators[0]}+(${final_simplified_Root2_in_numerator})^${expression_with_fraction_numerator.numerators[1]}`;
                            } else if (full_Expression_numerator === `${expression_with_fraction_numerator.signs[0]}(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})${expression_with_fraction_numerator.signs[0]}(${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]})`) {
                                if (expression_with_fraction_numerator.signs[0] === '+' && expression_with_fraction_numerator.signs[1] === '-') {
                                    full_Expression_numerator_dop = `((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2+((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))*((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))+((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^2`;
                                    full_Expression_numerator_final = `(${final_simplified_Root1_in_numerator})^${expression_with_fraction_numerator.numerators[0]}-(${final_simplified_Root2_in_numerator})^${expression_with_fraction_numerator.numerators[1]}`;
                                } else if (expression_with_fraction_numerator.signs[0] === '-' && expression_with_fraction_numerator.signs[1] === '+') {
                                    full_Expression_numerator_dop = `((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^2+((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))*((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))+((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2`;
                                    full_Expression_numerator_final = `(${final_simplified_Root2_in_numerator})^${expression_with_fraction_numerator.numerators[1]}-(${final_simplified_Root1_in_numerator})^${expression_with_fraction_numerator.numerators[0]}`;
                                } else {
                                    html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                    return html;
                                }
                            } else {
                                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                return html;
                            }
                        } else if (expression_with_fraction_numerator.denominators[0] === '4' && expression_with_fraction_numerator.denominators[1] === '4') {
                            html += `<div>Степени корней в числителе равны четырём, следовательно необходимо применить такую формулу сокращённого умножения, как: a<sup>4</sup>-b<sup>4</sup>=(a-b)(a<sup>3</sup>+a<sup>2</sup>*b+a*b<sup>2</sup>+b<sup>3</sup>).</div>`;
                            if (expression_with_fraction_numerator.signs[0] === '-' && expression_with_fraction_numerator.signs[1] === '+') {
                                full_Expression_numerator_dop = `((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^3+(((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^2)*((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))+((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))*(((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2)+((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^3`;
                                full_Expression_numerator_final = `(${final_simplified_Root2_in_numerator})^${expression_with_fraction_numerator.numerators[1]}-(${final_simplified_Root1_in_numerator})^${expression_with_fraction_numerator.numerators[0]}`;
                            } else if (expression_with_fraction_numerator.signs[0] === '+' && expression_with_fraction_numerator.signs[1] === '-') {
                                full_Expression_numerator_dop = `((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^3+(((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2)*((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))+((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))*(((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^2)+((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^3`;
                                full_Expression_numerator_final = `(${final_simplified_Root1_in_numerator})^${expression_with_fraction_numerator.numerators[0]}-(${final_simplified_Root2_in_numerator})^${expression_with_fraction_numerator.numerators[1]}`;
                            } else if (expression_with_fraction_numerator.signs[0] === '-' && expression_with_fraction_numerator.signs[1] === '-') {
                                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                return html;
                            } else if (expression_with_fraction_numerator.signs[0] === '+' && expression_with_fraction_numerator.signs[1] === '+') {
                                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                return html;
                            } else if (full_Expression_numerator === `${expression_with_fraction_numerator.signs[0]}(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})${expression_with_fraction_numerator.signs[0]}(${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]})`) {
                                if (expression_with_fraction_numerator.signs[0] === '+' && expression_with_fraction_numerator.signs[1] === '-') {
                                    full_Expression_numerator_dop = `((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^3+(((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2)*((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))+((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))*(((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^2)+((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^3`;
                                    full_Expression_numerator_final = `(${final_simplified_Root1_in_numerator})^${expression_with_fraction_numerator.numerators[0]}-(${final_simplified_Root2_in_numerator})^${expression_with_fraction_numerator.numerators[1]}`;
                                } else if (expression_with_fraction_numerator.signs[0] === '-' && expression_with_fraction_numerator.signs[1] === '+') {
                                    full_Expression_numerator_dop = `((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^3+(((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^2)*((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))+((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))*(((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2)+((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^3`;
                                    full_Expression_numerator_final = `(${final_simplified_Root2_in_numerator})^${expression_with_fraction_numerator.numerators[1]}-(${final_simplified_Root1_in_numerator})^${expression_with_fraction_numerator.numerators[0]}`;
                                } else {
                                    html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                    return html;
                                }
                            } else {
                                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                return html;
                            }
                        } else {
                            html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                            return html;
                        }
                    }
                } else if (expression_with_fraction_numerator.bases.length === 1) {
                    if (expression_with_fraction_numerator.numerators[0] === '1') {
                        if (full_Expression_numerator === `(${final_simplified2_in_numerator})${expression_with_fraction_numerator.signs[0]}(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})`) {
                            if (expression_with_fraction_numerator.signs[0] === '+') {
                                if (expression_with_fraction_numerator.denominators[0] === '2') {
                                    html += `<div>Степень корня в числителе равна двум, следовательно необходимо применить такую формулу сокращённого умножения, как разность квадратов: a<sup>2</sup>-b<sup>2</sup>=(a-b)(a+b).</div>`;
                                    full_Expression_numerator_dop = `(${final_simplified2_in_numerator})-(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})`;
                                    full_Expression_numerator_final = `(${final_simplified2_in_numerator})^2-(${final_simplified_Root1_in_numerator})`;
                                } else if (expression_with_fraction_numerator.denominators[0] === '3') {
                                    html += `<div>Степень корня в числителе равна трём, следовательно необходимо применить такие формулы сокращённого умножения, как разность или сумма кубов (в зависимости от знака между корнями): a<sup>3</sup>-b<sup>3</sup>=(a-b)(a<sup>2</sup>+a*b+b<sup>2</sup>) или a<sup>3</sup>+b<sup>3</sup>=(a+b)(a<sup>2</sup>-a*b+b<sup>2</sup>) соотственно.</div>`;
                                    full_Expression_numerator_dop = `(${final_simplified2_in_numerator})^2-(${final_simplified2_in_numerator})*((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))+((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2`;
                                    full_Expression_numerator_final = `(${final_simplified2_in_numerator})^3+(${final_simplified_Root1_in_numerator})`;
                                } else if (expression_with_fraction_numerator.denominators[0] === '4') {
                                    html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                    return html;
                                } else {
                                    html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                    return html;
                                }
                            } else if (expression_with_fraction_numerator.signs[0] === '-') {
                                if (expression_with_fraction_numerator.denominators[0] === '2') {
                                    html += `<div>Степень корня в числителе равна двум, следовательно необходимо применить такую формулу сокращённого умножения, как разность квадратов: a<sup>2</sup>-b<sup>2</sup>=(a-b)(a+b).</div>`;
                                    full_Expression_numerator_dop = `(${final_simplified2_in_numerator})+(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})`;
                                    full_Expression_numerator_final = `(${final_simplified2_in_numerator})^2-(${final_simplified_Root1_in_numerator})`;
                                } else if (expression_with_fraction_numerator.denominators[0] === '3') {
                                    html += `<div>Степень корня в числителе равна трём, следовательно необходимо применить такие формулы сокращённого умножения, как разность или сумма кубов (в зависимости от знака между корнями): a<sup>3</sup>-b<sup>3</sup>=(a-b)(a<sup>2</sup>+a*b+b<sup>2</sup>) или a<sup>3</sup>+b<sup>3</sup>=(a+b)(a<sup>2</sup>-a*b+b<sup>2</sup>) соотственно.</div>`;
                                    full_Expression_numerator_dop = `(${final_simplified2_in_numerator})^2+(${final_simplified2_in_numerator})*((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))+((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2`;
                                    full_Expression_numerator_final = `(${final_simplified2_in_numerator})^3-(${final_simplified_Root1_in_numerator})`;
                                } else if (expression_with_fraction_numerator.denominators[0] === '4') {
                                    html += `<div>Степень корня в числителе равна четырём, следовательно необходимо применить такую формулу сокращённого умножения, как: a<sup>4</sup>-b<sup>4</sup>=(a-b)(a<sup>3</sup>+a<sup>2</sup>*b+a*b<sup>2</sup>+b<sup>3</sup>).</div>`;
                                    full_Expression_numerator_dop = `(${final_simplified2_in_numerator})^3+((${final_simplified2_in_numerator})^2)*((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))+(${final_simplified2_in_numerator})*(((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2)+((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^3`;
                                    full_Expression_numerator_final = `(${final_simplified2_in_numerator})^4-(${final_simplified_Root1_in_numerator})`;
                                } else {
                                    html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                    return html;
                                }
                            } else {
                                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                return html;
                            }
                        } else if (full_Expression_numerator === `${expression_with_fraction_numerator.signs[0]}(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})` || full_Expression_numerator === `(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})`) {
                            html += `<div>В данном случае сопряжённое выражение будет представлять из себя исходный корень.</div>`;
                            full_Expression_numerator_dop = `(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})`;
                            if (expression_with_fraction_numerator.signs[0] === '+') {
                                full_Expression_numerator_final = `(${final_simplified_Root1_in_numerator})`;
                            } else {
                                full_Expression_numerator_final = `${expression_with_fraction_numerator.signs[0]}(${final_simplified_Root1_in_numerator})`;
                            }
                        }
                        else {
                            html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                            return html;
                        }
                    } else {
                        if (full_Expression_numerator === `(${final_simplified2_in_numerator})${expression_with_fraction_numerator.signs[0]}(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})`) {
                            if (expression_with_fraction_numerator.signs[0] === '+') {
                                if (expression_with_fraction_numerator.denominators[0] === '2') {
                                    html += `<div>Степень корня в числителе равна двум, следовательно необходимо применить такую формулу сокращённого умножения, как разность квадратов: a<sup>2</sup>-b<sup>2</sup>=(a-b)(a+b).</div>`;
                                    full_Expression_numerator_dop = `(${final_simplified2_in_numerator})-(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})`;
                                    full_Expression_numerator_final = `(${final_simplified2_in_numerator})^2-(${final_simplified_Root1_in_numerator})^${expression_with_fraction_numerator.numerators[0]}`;
                                } else if (expression_with_fraction_numerator.denominators[0] === '3') {
                                    html += `<div>Степень корня в числителе равна трём, следовательно необходимо применить такие формулы сокращённого умножения, как разность или сумма кубов (в зависимости от знака между корнями): a<sup>3</sup>-b<sup>3</sup>=(a-b)(a<sup>2</sup>+a*b+b<sup>2</sup>) или a<sup>3</sup>+b<sup>3</sup>=(a+b)(a<sup>2</sup>-a*b+b<sup>2</sup>) соотственно.</div>`;
                                    full_Expression_numerator_dop = `(${final_simplified2_in_numerator})^2-(${final_simplified2_in_numerator})*((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))+((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2`;
                                    full_Expression_numerator_final = `(${final_simplified2_in_numerator})^3+(${final_simplified_Root1_in_numerator})^${expression_with_fraction_numerator.numerators[0]}`;
                                } else if (expression_with_fraction_numerator.denominators[0] === '4') {
                                    html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                    return html;
                                } else {
                                    html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                    return html;
                                }
                            } else if (expression_with_fraction_numerator.signs[0] === '-') {
                                if (expression_with_fraction_numerator.denominators[0] === '2') {
                                    html += `<div>Степень корня в числителе равна двум, следовательно необходимо применить такую формулу сокращённого умножения, как разность квадратов: a<sup>2</sup>-b<sup>2</sup>=(a-b)(a+b).</div>`;
                                    full_Expression_numerator_dop = `(${final_simplified2_in_numerator})+(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})`;
                                    full_Expression_numerator_final = `(${final_simplified2_in_numerator})^2-(${final_simplified_Root1_in_numerator})^${expression_with_fraction_numerator.numerators[0]}`;
                                } else if (expression_with_fraction_numerator.denominators[0] === '3') {
                                    html += `<div>Степень корня в числителе равна трём, следовательно необходимо применить такие формулы сокращённого умножения, как разность или сумма кубов (в зависимости от знака между корнями): a<sup>3</sup>-b<sup>3</sup>=(a-b)(a<sup>2</sup>+a*b+b<sup>2</sup>) или a<sup>3</sup>+b<sup>3</sup>=(a+b)(a<sup>2</sup>-a*b+b<sup>2</sup>) соотственно.</div>`;
                                    full_Expression_numerator_dop = `(${final_simplified2_in_numerator})^2+(${final_simplified2_in_numerator})*((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))+((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2`;
                                    full_Expression_numerator_final = `(${final_simplified2_in_numerator})^3-(${final_simplified_Root1_in_numerator})^${expression_with_fraction_numerator.numerators[0]}`;
                                } else if (expression_with_fraction_numerator.denominators[0] === '4') {
                                    html += `<div>Степень корня в числителе равна четырём, следовательно необходимо применить такую формулу сокращённого умножения, как: a<sup>4</sup>-b<sup>4</sup>=(a-b)(a<sup>3</sup>+a<sup>2</sup>*b+a*b<sup>2</sup>+b<sup>3</sup>).</div>`;
                                    full_Expression_numerator_dop = `(${final_simplified2_in_numerator})^3+((${final_simplified2_in_numerator})^2)*((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))+(${final_simplified2_in_numerator})*(((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2)+((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^3`;
                                    full_Expression_numerator_final = `(${final_simplified2_in_numerator})^4-(${final_simplified_Root1_in_numerator})^${expression_with_fraction_numerator.numerators[0]}`;
                                } else {
                                    html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                    return html;
                                }
                            } else {
                                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                return html;
                            }
                        } else if (full_Expression_numerator === `${expression_with_fraction_numerator.signs[0]}(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})` || full_Expression_numerator === `(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})`) {
                            html += `<div>В данном случае сопряжённое выражение будет представлять из себя исходный корень.</div>`;
                            full_Expression_numerator_dop = `(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})`;
                            if (expression_with_fraction_numerator.signs[0] === '+') {
                                full_Expression_numerator_final = `(${final_simplified_Root1_in_numerator})^${expression_with_fraction_numerator.numerators[0]}`;
                            } else {
                                full_Expression_numerator_final = `${expression_with_fraction_numerator.signs[0]}(${final_simplified_Root1_in_numerator})^${expression_with_fraction_numerator.numerators[0]}`;
                            }
                        }
                        else {
                            html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                            return html;
                        }
                    }
                } else {
                    html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                    return html;
                }
                renderedStep = format_Formula_For_MathJax(full_Expression_numerator_dop);

                html += `<div>Таким образом, сопряжённое выражение для числителя будет иметь вид:</div>
                                <div class="mathjax-text">\\[${renderedStep}\\] </div>`;

                //Знаменатель
                html += `<div>Теперь рассмотрим знаметатель.</div>`;

                if (expression_with_fraction_denominator.bases.length === 2) {
                    if (expression_with_fraction_denominator.numerators[0] === '1' && expression_with_fraction_denominator.numerators[1] === '1') {
                        if (expression_with_fraction_denominator.denominators[0] === '2' && expression_with_fraction_denominator.denominators[1] === '2') {
                            html += `<div>Степени корней в знаменателе равны двум, следовательно необходимо применить такую формулу сокращённого умножения, как разность квадратов: a<sup>2</sup>-b<sup>2</sup>=(a-b)(a+b).</div>`;
                            if (expression_with_fraction_denominator.signs[0] === '-' && expression_with_fraction_denominator.signs[1] === '+') {
                                full_Expression_denominator_dop = `(${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]})+(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})`;
                                full_Expression_denominator_final = `(${final_simplified_Root2_in_denominator})-(${final_simplified_Root1_in_denominator})`;
                            } else if (expression_with_fraction_denominator.signs[0] === '+' && expression_with_fraction_denominator.signs[1] === '-') {
                                full_Expression_denominator_dop = `(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})+(${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]})`;
                                full_Expression_denominator_final = `(${final_simplified_Root1_in_denominator})-(${final_simplified_Root2_in_denominator})`;
                            } else if (expression_with_fraction_denominator.signs[0] === '-' && expression_with_fraction_denominator.signs[1] === '-') {
                                full_Expression_denominator_dop = `(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})-(${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]})`;
                                full_Expression_denominator_final = `-((${final_simplified_Root1_in_denominator})-(${final_simplified_Root2_in_denominator}))`;
                            } else if (expression_with_fraction_denominator.signs[0] === '+' && expression_with_fraction_denominator.signs[1] === '+') {
                                full_Expression_denominator_dop = `(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})-(${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]})`;
                                full_Expression_denominator_final = `(${final_simplified_Root1_in_denominator})-(${final_simplified_Root2_in_denominator})`;
                            } else if (full_Expression_denominator === `${expression_with_fraction_denominator.signs[0]}(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})${expression_with_fraction_denominator.signs[0]}(${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]})`) {
                                if (expression_with_fraction_denominator.signs[0] === '+' && expression_with_fraction_denominator.signs[1] === '-') {
                                    full_Expression_denominator_dop = `(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})+(${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]})`;
                                    full_Expression_denominator_final = `(${final_simplified_Root1_in_denominator})-(${final_simplified_Root2_in_denominator})`;
                                } else if (expression_with_fraction_denominator.signs[0] === '-' && expression_with_fraction_denominator.signs[1] === '+') {
                                    full_Expression_denominator_dop = `(${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]})+(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})`;
                                    full_Expression_denominator_final = `(${final_simplified_Root2_in_denominator})-(${final_simplified_Root1_in_denominator})`;
                                } else {
                                    html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                    return html;
                                }
                            } else {
                                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                return html;
                            }

                        } else if (expression_with_fraction_denominator.denominators[0] === '3' && expression_with_fraction_denominator.denominators[1] === '3') {
                            html += `<div>Степени корней в знаменателе равны трём, следовательно необходимо применить такие формулы сокращённого умножения, как разность или сумма кубов (в зависимости от знака между корнями): a<sup>3</sup>-b<sup>3</sup>=(a-b)(a<sup>2</sup>+a*b+b<sup>2</sup>) или a<sup>3</sup>+b<sup>3</sup>=(a+b)(a<sup>2</sup>-a*b+b<sup>2</sup>) соотственно.</div>`;
                            if (expression_with_fraction_denominator.signs[0] === '-' && expression_with_fraction_denominator.signs[1] === '+') {
                                full_Expression_denominator_dop = `((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^2+((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))*((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))+((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2`;
                                full_Expression_denominator_final = `(${final_simplified_Root2_in_denominator})-(${final_simplified_Root1_in_denominator})`;
                            } else if (expression_with_fraction_denominator.signs[0] === '+' && expression_with_fraction_denominator.signs[1] === '-') {
                                full_Expression_denominator_dop = `((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2+((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))*((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))+((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^2`;
                                full_Expression_denominator_final = `(${final_simplified_Root1_in_denominator})-(${final_simplified_Root2_in_denominator})`;
                            } else if (expression_with_fraction_denominator.signs[0] === '-' && expression_with_fraction_denominator.signs[1] === '-') {
                                full_Expression_denominator_dop = `((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2-((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))*((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))+((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^2`;
                                full_Expression_denominator_final = `-((${final_simplified_Root1_in_denominator})+(${final_simplified_Root2_in_denominator}))`;
                            } else if (expression_with_fraction_denominator.signs[0] === '+' && expression_with_fraction_denominator.signs[1] === '+') {
                                full_Expression_denominator_dop = `((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2-((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))*((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))+((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^2`;
                                full_Expression_denominator_final = `(${final_simplified_Root1_in_denominator})+(${final_simplified_Root2_in_denominator})`;
                            } else if (full_Expression_denominator === `${expression_with_fraction_denominator.signs[0]}(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})${expression_with_fraction_denominator.signs[0]}(${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]})`) {
                                if (expression_with_fraction_denominator.signs[0] === '+' && expression_with_fraction_denominator.signs[1] === '-') {
                                    full_Expression_denominator_dop = `((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2+((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))*((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))+((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^2`;
                                    full_Expression_denominator_final = `(${final_simplified_Root1_in_denominator})-(${final_simplified_Root2_in_denominator})`;
                                } else if (expression_with_fraction_denominator.signs[0] === '-' && expression_with_fraction_denominator.signs[1] === '+') {
                                    full_Expression_denominator_dop = `((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^2+((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))*((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))+((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2`;
                                    full_Expression_denominator_final = `(${final_simplified_Root2_in_denominator})-(${final_simplified_Root1_in_denominator})`;
                                } else {
                                    html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                    return html;
                                }
                            } else {
                                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                return html;
                            }
                        } else if (expression_with_fraction_denominator.denominators[0] === '4' && expression_with_fraction_denominator.denominators[1] === '4') {
                            html += `<div>Степени корней в знаменателе равны четырём, следовательно необходимо применить такую формулу сокращённого умножения, как: a<sup>4</sup>-b<sup>4</sup>=(a-b)(a<sup>3</sup>+a<sup>2</sup>*b+a*b<sup>2</sup>+b<sup>3</sup>).</div>`;
                            if (expression_with_fraction_denominator.signs[0] === '-' && expression_with_fraction_denominator.signs[1] === '+') {
                                full_Expression_denominator_dop = `((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^3+(((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^2)*((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))+((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))*(((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2)+((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^3`;
                                full_Expression_denominator_final = `(${final_simplified_Root2_in_denominator})-(${final_simplified_Root1_in_denominator})`;
                            } else if (expression_with_fraction_denominator.signs[0] === '+' && expression_with_fraction_denominator.signs[1] === '-') {
                                full_Expression_denominator_dop = `((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^3+(((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2)*((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))+((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))*(((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^2)+((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^3`;
                                full_Expression_denominator_final = `(${final_simplified_Root1_in_denominator})-(${final_simplified_Root2_in_denominator})`;
                            } else if (expression_with_fraction_denominator.signs[0] === '-' && expression_with_fraction_denominator.signs[1] === '-') {
                                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                return html;
                            } else if (expression_with_fraction_denominator.signs[0] === '+' && expression_with_fraction_denominator.signs[1] === '+') {
                                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                return html;
                            } else if (full_Expression_denominator === `${expression_with_fraction_denominator.signs[0]}(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})${expression_with_fraction_denominator.signs[0]}(${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]})`) {
                                if (expression_with_fraction_denominator.signs[0] === '+' && expression_with_fraction_denominator.signs[1] === '-') {
                                    full_Expression_denominator_dop = `((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^3+(((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2)*((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))+((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))*(((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^2)+((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^3`;
                                    full_Expression_denominator_final = `(${final_simplified_Root1_in_denominator})-(${final_simplified_Root2_in_denominator})`;
                                } else if (expression_with_fraction_denominator.signs[0] === '-' && expression_with_fraction_denominator.signs[1] === '+') {
                                    full_Expression_denominator_dop = `((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^3+(((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^2)*((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))+((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))*(((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2)+((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^3`;
                                    full_Expression_denominator_final = `(${final_simplified_Root2_in_denominator})-(${final_simplified_Root1_in_denominator})`;
                                } else {
                                    html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                    return html;
                                }
                            } else {
                                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                return html;
                            }
                        } else {
                            html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                            return html;
                        }
                    } else if (expression_with_fraction_denominator.numerators[0] === '1') {
                        if (expression_with_fraction_denominator.denominators[0] === '2' && expression_with_fraction_denominator.denominators[1] === '2') {
                            html += `<div>Степени корней в знаменателе равны двум, следовательно необходимо применить такую формулу сокращённого умножения, как разность квадратов: a<sup>2</sup>-b<sup>2</sup>=(a-b)(a+b).</div>`;
                            if (expression_with_fraction_denominator.signs[0] === '-' && expression_with_fraction_denominator.signs[1] === '+') {
                                full_Expression_denominator_dop = `(${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]})+(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})`;
                                full_Expression_denominator_final = `(${final_simplified_Root2_in_denominator})^${expression_with_fraction_denominator.numerators[1]}-(${final_simplified_Root1_in_denominator})`;
                            } else if (expression_with_fraction_denominator.signs[0] === '+' && expression_with_fraction_denominator.signs[1] === '-') {
                                full_Expression_denominator_dop = `(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})+(${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]})`;
                                full_Expression_denominator_final = `(${final_simplified_Root1_in_denominator})-(${final_simplified_Root2_in_denominator})^${expression_with_fraction_denominator.numerators[1]}`;
                            } else if (expression_with_fraction_denominator.signs[0] === '-' && expression_with_fraction_denominator.signs[1] === '-') {
                                full_Expression_denominator_dop = `(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})-(${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]})`;
                                full_Expression_denominator_final = `-((${final_simplified_Root1_in_denominator})-(${final_simplified_Root2_in_denominator})^${expression_with_fraction_denominator.numerators[1]})`;
                            } else if (expression_with_fraction_denominator.signs[0] === '+' && expression_with_fraction_denominator.signs[1] === '+') {
                                full_Expression_denominator_dop = `(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})-(${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]})`;
                                full_Expression_denominator_final = `(${final_simplified_Root1_in_denominator})-(${final_simplified_Root2_in_denominator})^${expression_with_fraction_denominator.numerators[1]}`;
                            } else if (full_Expression_denominator === `${expression_with_fraction_denominator.signs[0]}(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})${expression_with_fraction_denominator.signs[0]}(${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]})`) {
                                if (expression_with_fraction_denominator.signs[0] === '+' && expression_with_fraction_denominator.signs[1] === '-') {
                                    full_Expression_denominator_dop = `(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})+(${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]})`;
                                    full_Expression_denominator_final = `(${final_simplified_Root1_in_denominator})-(${final_simplified_Root2_in_denominator})^${expression_with_fraction_denominator.numerators[1]}`;
                                } else if (expression_with_fraction_denominator.signs[0] === '-' && expression_with_fraction_denominator.signs[1] === '+') {
                                    full_Expression_denominator_dop = `(${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]})+(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})`;
                                    full_Expression_denominator_final = `(${final_simplified_Root2_in_denominator})^${expression_with_fraction_denominator.numerators[1]}-(${final_simplified_Root1_in_denominator})`;
                                } else {
                                    html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                    return html;
                                }
                            } else {
                                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                return html;
                            }

                        } else if (expression_with_fraction_denominator.denominators[0] === '3' && expression_with_fraction_denominator.denominators[1] === '3') {
                            html += `<div>Степени корней в знаменателе равны трём, следовательно необходимо применить такие формулы сокращённого умножения, как разность или сумма кубов (в зависимости от знака между корнями): a<sup>3</sup>-b<sup>3</sup>=(a-b)(a<sup>2</sup>+a*b+b<sup>2</sup>) или a<sup>3</sup>+b<sup>3</sup>=(a+b)(a<sup>2</sup>-a*b+b<sup>2</sup>) соотственно.</div>`;
                            if (expression_with_fraction_denominator.signs[0] === '-' && expression_with_fraction_denominator.signs[1] === '+') {
                                full_Expression_denominator_dop = `((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^2+((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))*((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))+((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2`;
                                full_Expression_denominator_final = `(${final_simplified_Root2_in_denominator})^${expression_with_fraction_denominator.numerators[1]}-(${final_simplified_Root1_in_denominator})`;
                            } else if (expression_with_fraction_denominator.signs[0] === '+' && expression_with_fraction_denominator.signs[1] === '-') {
                                full_Expression_denominator_dop = `((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2+((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))*((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))+((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^2`;
                                full_Expression_denominator_final = `(${final_simplified_Root1_in_denominator})-(${final_simplified_Root2_in_denominator})^${expression_with_fraction_denominator.numerators[1]}`;
                            } else if (expression_with_fraction_denominator.signs[0] === '-' && expression_with_fraction_denominator.signs[1] === '-') {
                                full_Expression_denominator_dop = `((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2-((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))*((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))+((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^2`;
                                full_Expression_denominator_final = `-((${final_simplified_Root1_in_denominator})+(${final_simplified_Root2_in_denominator})^${expression_with_fraction_denominator.numerators[1]})`;
                            } else if (expression_with_fraction_denominator.signs[0] === '+' && expression_with_fraction_denominator.signs[1] === '+') {
                                full_Expression_denominator_dop = `((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2-((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))*((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))+((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^2`;
                                full_Expression_denominator_final = `(${final_simplified_Root1_in_denominator})+(${final_simplified_Root2_in_denominator})^${expression_with_fraction_denominator.numerators[1]}`;
                            } else if (full_Expression_denominator === `${expression_with_fraction_denominator.signs[0]}(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})${expression_with_fraction_denominator.signs[0]}(${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]})`) {
                                if (expression_with_fraction_denominator.signs[0] === '+' && expression_with_fraction_denominator.signs[1] === '-') {
                                    full_Expression_denominator_dop = `((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2+((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))*((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))+((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^2`;
                                    full_Expression_denominator_final = `(${final_simplified_Root1_in_denominator})-(${final_simplified_Root2_in_denominator})^${expression_with_fraction_denominator.numerators[1]}`;
                                } else if (expression_with_fraction_denominator.signs[0] === '-' && expression_with_fraction_denominator.signs[1] === '+') {
                                    full_Expression_denominator_dop = `((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^2+((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))*((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))+((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2`;
                                    full_Expression_denominator_final = `(${final_simplified_Root2_in_denominator})^${expression_with_fraction_denominator.numerators[1]}-(${final_simplified_Root1_in_denominator})`;
                                } else {
                                    html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                    return html;
                                }
                            } else {
                                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                return html;
                            }
                        } else if (expression_with_fraction_denominator.denominators[0] === '4' && expression_with_fraction_denominator.denominators[1] === '4') {
                            html += `<div>Степени корней в знаменателе равны четырём, следовательно необходимо применить такую формулу сокращённого умножения, как: a<sup>4</sup>-b<sup>4</sup>=(a-b)(a<sup>3</sup>+a<sup>2</sup>*b+a*b<sup>2</sup>+b<sup>3</sup>).</div>`;
                            if (expression_with_fraction_denominator.signs[0] === '-' && expression_with_fraction_denominator.signs[1] === '+') {
                                full_Expression_denominator_dop = `((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^3+(((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^2)*((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))+((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))*(((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2)+((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^3`;
                                full_Expression_denominator_final = `(${final_simplified_Root2_in_denominator})^${expression_with_fraction_denominator.numerators[1]}-(${final_simplified_Root1_in_denominator})`;
                            } else if (expression_with_fraction_denominator.signs[0] === '+' && expression_with_fraction_denominator.signs[1] === '-') {
                                full_Expression_denominator_dop = `((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^3+(((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2)*((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))+((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))*(((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^2)+((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^3`;
                                full_Expression_denominator_final = `(${final_simplified_Root1_in_denominator})-(${final_simplified_Root2_in_denominator})^${expression_with_fraction_denominator.numerators[1]}`;
                            } else if (expression_with_fraction_denominator.signs[0] === '-' && expression_with_fraction_denominator.signs[1] === '-') {
                                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                return html;
                            } else if (expression_with_fraction_denominator.signs[0] === '+' && expression_with_fraction_denominator.signs[1] === '+') {
                                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                return html;
                            } else if (full_Expression_denominator === `${expression_with_fraction_denominator.signs[0]}(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})${expression_with_fraction_denominator.signs[0]}(${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]})`) {
                                if (expression_with_fraction_denominator.signs[0] === '+' && expression_with_fraction_denominator.signs[1] === '-') {
                                    full_Expression_denominator_dop = `((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^3+(((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2)*((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))+((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))*(((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^2)+((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^3`;
                                    full_Expression_denominator_final = `(${final_simplified_Root1_in_denominator})-(${final_simplified_Root2_in_denominator})^${expression_with_fraction_denominator.numerators[1]}`;
                                } else if (expression_with_fraction_denominator.signs[0] === '-' && expression_with_fraction_denominator.signs[1] === '+') {
                                    full_Expression_denominator_dop = `((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^3+(((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^2)*((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))+((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))*(((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2)+((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^3`;
                                    full_Expression_denominator_final = `(${final_simplified_Root2_in_denominator})^${expression_with_fraction_denominator.numerators[1]}-(${final_simplified_Root1_in_denominator})`;
                                } else {
                                    html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                    return html;
                                }
                            } else {
                                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                return html;
                            }
                        } else {
                            html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                            return html;
                        }
                    } else if (expression_with_fraction_denominator.numerators[1] === '1') {
                        if (expression_with_fraction_denominator.denominators[0] === '2' && expression_with_fraction_denominator.denominators[1] === '2') {
                            html += `<div>Степени корней в знаменателе равны двум, следовательно необходимо применить такую формулу сокращённого умножения, как разность квадратов: a<sup>2</sup>-b<sup>2</sup>=(a-b)(a+b).</div>`;
                            if (expression_with_fraction_denominator.signs[0] === '-' && expression_with_fraction_denominator.signs[1] === '+') {
                                full_Expression_denominator_dop = `(${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]})+(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})`;
                                full_Expression_denominator_final = `(${final_simplified_Root2_in_denominator})-(${final_simplified_Root1_in_denominator})^${expression_with_fraction_denominator.numerators[0]}`;
                            } else if (expression_with_fraction_denominator.signs[0] === '+' && expression_with_fraction_denominator.signs[1] === '-') {
                                full_Expression_denominator_dop = `(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})+(${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]})`;
                                full_Expression_denominator_final = `(${final_simplified_Root1_in_denominator})^${expression_with_fraction_denominator.numerators[0]}-(${final_simplified_Root2_in_denominator})`;
                            } else if (expression_with_fraction_denominator.signs[0] === '-' && expression_with_fraction_denominator.signs[1] === '-') {
                                full_Expression_denominator_dop = `(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})-(${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]})`;
                                full_Expression_denominator_final = `-((${final_simplified_Root1_in_denominator})^${expression_with_fraction_denominator.numerators[0]}-(${final_simplified_Root2_in_denominator})`;
                            } else if (expression_with_fraction_denominator.signs[0] === '+' && expression_with_fraction_denominator.signs[1] === '+') {
                                full_Expression_denominator_dop = `(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})-(${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]})`;
                                full_Expression_denominator_final = `(${final_simplified_Root1_in_denominator})^${expression_with_fraction_denominator.numerators[0]}-(${final_simplified_Root2_in_denominator})`;
                            } else if (full_Expression_denominator === `${expression_with_fraction_denominator.signs[0]}(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})${expression_with_fraction_denominator.signs[0]}(${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]})`) {
                                if (expression_with_fraction_denominator.signs[0] === '+' && expression_with_fraction_denominator.signs[1] === '-') {
                                    full_Expression_denominator_dop = `(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})+(${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]})`;
                                    full_Expression_denominator_final = `(${final_simplified_Root1_in_denominator})^${expression_with_fraction_denominator.numerators[0]}-(${final_simplified_Root2_in_denominator})`;
                                } else if (expression_with_fraction_denominator.signs[0] === '-' && expression_with_fraction_denominator.signs[1] === '+') {
                                    full_Expression_denominator_dop = `(${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]})+(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})`;
                                    full_Expression_denominator_final = `(${final_simplified_Root2_in_denominator})-(${final_simplified_Root1_in_denominator})^${expression_with_fraction_denominator.numerators[0]}`;
                                } else {
                                    html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                    return html;
                                }
                            } else {
                                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                return html;
                            }

                        } else if (expression_with_fraction_denominator.denominators[0] === '3' && expression_with_fraction_denominator.denominators[1] === '3') {
                            html += `<div>Степени корней в знаменателе равны трём, следовательно необходимо применить такие формулы сокращённого умножения, как разность или сумма кубов (в зависимости от знака между корнями): a<sup>3</sup>-b<sup>3</sup>=(a-b)(a<sup>2</sup>+a*b+b<sup>2</sup>) или a<sup>3</sup>+b<sup>3</sup>=(a+b)(a<sup>2</sup>-a*b+b<sup>2</sup>) соотственно.</div>`;
                            if (expression_with_fraction_denominator.signs[0] === '-' && expression_with_fraction_denominator.signs[1] === '+') {
                                full_Expression_denominator_dop = `((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^2+((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))*((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))+((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2`;
                                full_Expression_denominator_final = `(${final_simplified_Root2_in_denominator})-(${final_simplified_Root1_in_denominator})^${expression_with_fraction_denominator.numerators[0]}`;
                            } else if (expression_with_fraction_denominator.signs[0] === '+' && expression_with_fraction_denominator.signs[1] === '-') {
                                full_Expression_denominator_dop = `((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2+((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))*((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))+((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^2`;
                                full_Expression_denominator_final = `(${final_simplified_Root1_in_denominator})^${expression_with_fraction_denominator.numerators[0]}-(${final_simplified_Root2_in_denominator})`;
                            } else if (expression_with_fraction_denominator.signs[0] === '-' && expression_with_fraction_denominator.signs[1] === '-') {
                                full_Expression_denominator_dop = `((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2-((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))*((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))+((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^2`;
                                full_Expression_denominator_final = `-((${final_simplified_Root1_in_denominator})^${expression_with_fraction_denominator.numerators[0]}+(${final_simplified_Root2_in_denominator})`;
                            } else if (expression_with_fraction_denominator.signs[0] === '+' && expression_with_fraction_denominator.signs[1] === '+') {
                                full_Expression_denominator_dop = `((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2-((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))*((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))+((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^2`;
                                full_Expression_denominator_final = `(${final_simplified_Root1_in_denominator})^${expression_with_fraction_denominator.numerators[0]}+(${final_simplified_Root2_in_denominator})`;
                            } else if (full_Expression_denominator === `${expression_with_fraction_denominator.signs[0]}(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})${expression_with_fraction_denominator.signs[0]}(${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]})`) {
                                if (expression_with_fraction_denominator.signs[0] === '+' && expression_with_fraction_denominator.signs[1] === '-') {
                                    full_Expression_denominator_dop = `((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2+((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))*((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))+((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^2`;
                                    full_Expression_denominator_final = `(${final_simplified_Root1_in_denominator})^${expression_with_fraction_denominator.numerators[0]}-(${final_simplified_Root2_in_denominator})`;
                                } else if (expression_with_fraction_denominator.signs[0] === '-' && expression_with_fraction_denominator.signs[1] === '+') {
                                    full_Expression_denominator_dop = `((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^2+((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))*((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))+((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2`;
                                    full_Expression_denominator_final = `(${final_simplified_Root2_in_denominator})-(${final_simplified_Root1_in_denominator})^${expression_with_fraction_denominator.numerators[0]}`;
                                } else {
                                    html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                    return html;
                                }
                            } else {
                                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                return html;
                            }
                        } else if (expression_with_fraction_denominator.denominators[0] === '4' && expression_with_fraction_denominator.denominators[1] === '4') {
                            html += `<div>Степени корней в знаменателе равны четырём, следовательно необходимо применить такую формулу сокращённого умножения, как: a<sup>4</sup>-b<sup>4</sup>=(a-b)(a<sup>3</sup>+a<sup>2</sup>*b+a*b<sup>2</sup>+b<sup>3</sup>).</div>`;
                            if (expression_with_fraction_denominator.signs[0] === '-' && expression_with_fraction_denominator.signs[1] === '+') {
                                full_Expression_denominator_dop = `((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^3+(((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^2)*((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))+((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))*(((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2)+((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^3`;
                                full_Expression_denominator_final = `(${final_simplified_Root2_in_denominator})-(${final_simplified_Root1_in_denominator})^${expression_with_fraction_denominator.numerators[0]}`;
                            } else if (expression_with_fraction_denominator.signs[0] === '+' && expression_with_fraction_denominator.signs[1] === '-') {
                                full_Expression_denominator_dop = `((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^3+(((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2)*((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))+((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))*(((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^2)+((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^3`;
                                full_Expression_denominator_final = `(${final_simplified_Root1_in_denominator})^${expression_with_fraction_denominator.numerators[0]}-(${final_simplified_Root2_in_denominator})`;
                            } else if (expression_with_fraction_denominator.signs[0] === '-' && expression_with_fraction_denominator.signs[1] === '-') {
                                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                return html;
                            } else if (expression_with_fraction_denominator.signs[0] === '+' && expression_with_fraction_denominator.signs[1] === '+') {
                                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                return html;
                            } else if (full_Expression_denominator === `${expression_with_fraction_denominator.signs[0]}(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})${expression_with_fraction_denominator.signs[0]}(${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]})`) {
                                if (expression_with_fraction_denominator.signs[0] === '+' && expression_with_fraction_denominator.signs[1] === '-') {
                                    full_Expression_denominator_dop = `((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^3+(((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2)*((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))+((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))*(((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^2)+((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^3`;
                                    full_Expression_denominator_final = `(${final_simplified_Root1_in_denominator})^${expression_with_fraction_denominator.numerators[0]}-(${final_simplified_Root2_in_denominator})`;
                                } else if (expression_with_fraction_denominator.signs[0] === '-' && expression_with_fraction_denominator.signs[1] === '+') {
                                    full_Expression_denominator_dop = `((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^3+(((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^2)*((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))+((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))*(((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2)+((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^3`;
                                    full_Expression_denominator_final = `(${final_simplified_Root2_in_denominator})-(${final_simplified_Root1_in_denominator})^${expression_with_fraction_denominator.numerators[0]}`;
                                } else {
                                    html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                    return html;
                                }
                            } else {
                                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                return html;
                            }
                        } else {
                            html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                            return html;
                        }
                    } else {
                        if (expression_with_fraction_denominator.denominators[0] === '2' && expression_with_fraction_denominator.denominators[1] === '2') {
                            html += `<div>Степени корней в знаменателе равны двум, следовательно необходимо применить такую формулу сокращённого умножения, как разность квадратов: a<sup>2</sup>-b<sup>2</sup>=(a-b)(a+b).</div>`;
                            if (expression_with_fraction_denominator.signs[0] === '-' && expression_with_fraction_denominator.signs[1] === '+') {
                                full_Expression_denominator_dop = `(${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]})+(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})`;
                                full_Expression_denominator_final = `(${final_simplified_Root2_in_denominator})^${expression_with_fraction_denominator.numerators[1]}-(${final_simplified_Root1_in_denominator})^${expression_with_fraction_denominator.numerators[0]}`;
                            } else if (expression_with_fraction_denominator.signs[0] === '+' && expression_with_fraction_denominator.signs[1] === '-') {
                                full_Expression_denominator_dop = `(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})+(${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]})`;
                                full_Expression_denominator_final = `(${final_simplified_Root1_in_denominator})^${expression_with_fraction_denominator.numerators[0]}-(${final_simplified_Root2_in_denominator})^${expression_with_fraction_denominator.numerators[1]}`;
                            } else if (expression_with_fraction_denominator.signs[0] === '-' && expression_with_fraction_denominator.signs[1] === '-') {
                                full_Expression_denominator_dop = `(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})-(${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]})`;
                                full_Expression_denominator_final = `-((${final_simplified_Root1_in_denominator})^${expression_with_fraction_denominator.numerators[0]}-(${final_simplified_Root2_in_denominator})^${expression_with_fraction_denominator.numerators[1]})`;
                            } else if (expression_with_fraction_denominator.signs[0] === '+' && expression_with_fraction_denominator.signs[1] === '+') {
                                full_Expression_denominator_dop = `(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})-(${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]})`;
                                full_Expression_denominator_final = `(${final_simplified_Root1_in_denominator})^${expression_with_fraction_denominator.numerators[0]}-(${final_simplified_Root2_in_denominator})^${expression_with_fraction_denominator.numerators[1]}`;
                            } else if (full_Expression_denominator === `${expression_with_fraction_denominator.signs[0]}(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})${expression_with_fraction_denominator.signs[0]}(${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]})`) {
                                if (expression_with_fraction_denominator.signs[0] === '+' && expression_with_fraction_denominator.signs[1] === '-') {
                                    full_Expression_denominator_dop = `(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})+(${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]})`;
                                    full_Expression_denominator_final = `(${final_simplified_Root1_in_denominator})^${expression_with_fraction_denominator.numerators[0]}-(${final_simplified_Root2_in_denominator})^${expression_with_fraction_denominator.numerators[1]}`;
                                } else if (expression_with_fraction_denominator.signs[0] === '-' && expression_with_fraction_denominator.signs[1] === '+') {
                                    full_Expression_denominator_dop = `(${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]})+(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})`;
                                    full_Expression_denominator_final = `(${final_simplified_Root2_in_denominator})^${expression_with_fraction_denominator.numerators[1]}-(${final_simplified_Root1_in_denominator})^${expression_with_fraction_denominator.numerators[0]}`;
                                } else {
                                    html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                    return html;
                                }
                            } else {
                                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                return html;
                            }

                        } else if (expression_with_fraction_denominator.denominators[0] === '3' && expression_with_fraction_denominator.denominators[1] === '3') {
                            html += `<div>Степени корней в знаменателе равны трём, следовательно необходимо применить такие формулы сокращённого умножения, как разность или сумма кубов (в зависимости от знака между корнями): a<sup>3</sup>-b<sup>3</sup>=(a-b)(a<sup>2</sup>+a*b+b<sup>2</sup>) или a<sup>3</sup>+b<sup>3</sup>=(a+b)(a<sup>2</sup>-a*b+b<sup>2</sup>) соотственно.</div>`;
                            if (expression_with_fraction_denominator.signs[0] === '-' && expression_with_fraction_denominator.signs[1] === '+') {
                                full_Expression_denominator_dop = `((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^2+((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))*((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))+((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2`;
                                full_Expression_denominator_final = `(${final_simplified_Root2_in_denominator})^${expression_with_fraction_denominator.numerators[1]}-(${final_simplified_Root1_in_denominator})^${expression_with_fraction_denominator.numerators[0]}`;
                            } else if (expression_with_fraction_denominator.signs[0] === '+' && expression_with_fraction_denominator.signs[1] === '-') {
                                full_Expression_denominator_dop = `((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2+((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))*((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))+((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^2`;
                                full_Expression_denominator_final = `(${final_simplified_Root1_in_denominator})^${expression_with_fraction_denominator.numerators[0]}-(${final_simplified_Root2_in_denominator})^${expression_with_fraction_denominator.numerators[1]}`;
                            } else if (expression_with_fraction_denominator.signs[0] === '-' && expression_with_fraction_denominator.signs[1] === '-') {
                                full_Expression_denominator_dop = `((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2-((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))*((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))+((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^2`;
                                full_Expression_denominator_final = `-((${final_simplified_Root1_in_denominator})^${expression_with_fraction_denominator.numerators[0]}+(${final_simplified_Root2_in_denominator})^${expression_with_fraction_denominator.numerators[1]})`;
                            } else if (expression_with_fraction_denominator.signs[0] === '+' && expression_with_fraction_denominator.signs[1] === '+') {
                                full_Expression_denominator_dop = `((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2-((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))*((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))+((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^2`;
                                full_Expression_denominator_final = `(${final_simplified_Root1_in_denominator})^${expression_with_fraction_denominator.numerators[0]}+(${final_simplified_Root2_in_denominator})^${expression_with_fraction_denominator.numerators[1]}`;
                            } else if (full_Expression_denominator === `${expression_with_fraction_denominator.signs[0]}(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})${expression_with_fraction_denominator.signs[0]}(${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]})`) {
                                if (expression_with_fraction_denominator.signs[0] === '+' && expression_with_fraction_denominator.signs[1] === '-') {
                                    full_Expression_denominator_dop = `((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2+((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))*((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))+((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^2`;
                                    full_Expression_denominator_final = `(${final_simplified_Root1_in_denominator})^${expression_with_fraction_denominator.numerators[0]}-(${final_simplified_Root2_in_denominator})^${expression_with_fraction_denominator.numerators[1]}`;
                                } else if (expression_with_fraction_denominator.signs[0] === '-' && expression_with_fraction_denominator.signs[1] === '+') {
                                    full_Expression_denominator_dop = `((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^2+((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))*((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))+((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2`;
                                    full_Expression_denominator_final = `(${final_simplified_Root2_in_denominator})^${expression_with_fraction_denominator.numerators[1]}-(${final_simplified_Root1_in_denominator})^${expression_with_fraction_denominator.numerators[0]}`;
                                } else {
                                    html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                    return html;
                                }
                            } else {
                                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                return html;
                            }
                        } else if (expression_with_fraction_denominator.denominators[0] === '4' && expression_with_fraction_denominator.denominators[1] === '4') {
                            html += `<div>Степени корней в знаменателе равны четырём, следовательно необходимо применить такую формулу сокращённого умножения, как: a<sup>4</sup>-b<sup>4</sup>=(a-b)(a<sup>3</sup>+a<sup>2</sup>*b+a*b<sup>2</sup>+b<sup>3</sup>).</div>`;
                            if (expression_with_fraction_denominator.signs[0] === '-' && expression_with_fraction_denominator.signs[1] === '+') {
                                full_Expression_denominator_dop = `((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^3+(((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^2)*((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))+((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))*(((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2)+((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^3`;
                                full_Expression_denominator_final = `(${final_simplified_Root2_in_denominator})^${expression_with_fraction_denominator.numerators[1]}-(${final_simplified_Root1_in_denominator})^${expression_with_fraction_denominator.numerators[0]}`;
                            } else if (expression_with_fraction_denominator.signs[0] === '+' && expression_with_fraction_denominator.signs[1] === '-') {
                                full_Expression_denominator_dop = `((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^3+(((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2)*((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))+((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))*(((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^2)+((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^3`;
                                full_Expression_denominator_final = `(${final_simplified_Root1_in_denominator})^${expression_with_fraction_denominator.numerators[0]}-(${final_simplified_Root2_in_denominator})^${expression_with_fraction_denominator.numerators[1]}`;
                            } else if (expression_with_fraction_denominator.signs[0] === '-' && expression_with_fraction_denominator.signs[1] === '-') {
                                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                return html;
                            } else if (expression_with_fraction_denominator.signs[0] === '+' && expression_with_fraction_denominator.signs[1] === '+') {
                                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                return html;
                            } else if (full_Expression_denominator === `${expression_with_fraction_denominator.signs[0]}(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})${expression_with_fraction_denominator.signs[0]}(${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]})`) {
                                if (expression_with_fraction_denominator.signs[0] === '+' && expression_with_fraction_denominator.signs[1] === '-') {
                                    full_Expression_denominator_dop = `((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^3+(((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2)*((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))+((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))*(((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^2)+((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^3`;
                                    full_Expression_denominator_final = `(${final_simplified_Root1_in_denominator})^${expression_with_fraction_denominator.numerators[0]}-(${final_simplified_Root2_in_denominator})^${expression_with_fraction_denominator.numerators[1]}`;
                                } else if (expression_with_fraction_denominator.signs[0] === '-' && expression_with_fraction_denominator.signs[1] === '+') {
                                    full_Expression_denominator_dop = `((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^3+(((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^2)*((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))+((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))*(((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2)+((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^3`;
                                    full_Expression_denominator_final = `(${final_simplified_Root2_in_denominator})^${expression_with_fraction_denominator.numerators[1]}-(${final_simplified_Root1_in_denominator})^${expression_with_fraction_denominator.numerators[0]}`;
                                } else {
                                    html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                    return html;
                                }
                            } else {
                                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                return html;
                            }
                        } else {
                            html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                            return html;
                        }
                    }
                } else if (expression_with_fraction_denominator.bases.length === 1) {
                    if (expression_with_fraction_denominator.numerators[0] === '1') {
                        if (full_Expression_denominator === `(${final_simplified2_in_denominator})${expression_with_fraction_denominator.signs[0]}(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})`) {
                            if (expression_with_fraction_denominator.signs[0] === '+') {
                                if (expression_with_fraction_denominator.denominators[0] === '2') {
                                    html += `<div>Степень корня в знаменателе равна двум, следовательно необходимо применить такую формулу сокращённого умножения, как разность квадратов: a<sup>2</sup>-b<sup>2</sup>=(a-b)(a+b).</div>`;
                                    full_Expression_denominator_dop = `(${final_simplified2_in_denominator})-(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})`;
                                    full_Expression_denominator_final = `(${final_simplified2_in_denominator})^2-(${final_simplified_Root1_in_denominator})`;
                                } else if (expression_with_fraction_denominator.denominators[0] === '3') {
                                    html += `<div>Степень корня в знаменателе равна трём, следовательно необходимо применить такие формулы сокращённого умножения, как разность или сумма кубов (в зависимости от знака между корнями): a<sup>3</sup>-b<sup>3</sup>=(a-b)(a<sup>2</sup>+a*b+b<sup>2</sup>) или a<sup>3</sup>+b<sup>3</sup>=(a+b)(a<sup>2</sup>-a*b+b<sup>2</sup>) соотственно.</div>`;
                                    full_Expression_denominator_dop = `(${final_simplified2_in_denominator})^2-(${final_simplified2_in_denominator})*((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))+((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2`;
                                    full_Expression_denominator_final = `(${final_simplified2_in_denominator})^3+(${final_simplified_Root1_in_denominator})`;
                                } else if (expression_with_fraction_denominator.denominators[0] === '4') {
                                    html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                    return html;
                                } else {
                                    html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                    return html;
                                }
                            } else if (expression_with_fraction_denominator.signs[0] === '-') {
                                if (expression_with_fraction_denominator.denominators[0] === '2') {
                                    html += `<div>Степень корня в знаменателе равна двум, следовательно необходимо применить такую формулу сокращённого умножения, как разность квадратов: a<sup>2</sup>-b<sup>2</sup>=(a-b)(a+b).</div>`;
                                    full_Expression_denominator_dop = `(${final_simplified2_in_denominator})+(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})`;
                                    full_Expression_denominator_final = `(${final_simplified2_in_denominator})^2-(${final_simplified_Root1_in_denominator})`;
                                } else if (expression_with_fraction_denominator.denominators[0] === '3') {
                                    html += `<div>Степень корня в знаменателе равна трём, следовательно необходимо применить такие формулы сокращённого умножения, как разность или сумма кубов (в зависимости от знака между корнями): a<sup>3</sup>-b<sup>3</sup>=(a-b)(a<sup>2</sup>+a*b+b<sup>2</sup>) или a<sup>3</sup>+b<sup>3</sup>=(a+b)(a<sup>2</sup>-a*b+b<sup>2</sup>) соотственно.</div>`;
                                    full_Expression_denominator_dop = `(${final_simplified2_in_denominator})^2+(${final_simplified2_in_denominator})*((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))+((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2`;
                                    full_Expression_denominator_final = `(${final_simplified2_in_denominator})^3-(${final_simplified_Root1_in_denominator})`;
                                } else if (expression_with_fraction_denominator.denominators[0] === '4') {
                                    html += `<div>Степень корня в знаменателе равна четырём, следовательно необходимо применить такую формулу сокращённого умножения, как: a<sup>4</sup>-b<sup>4</sup>=(a-b)(a<sup>3</sup>+a<sup>2</sup>*b+a*b<sup>2</sup>+b<sup>3</sup>).</div>`;
                                    full_Expression_denominator_dop = `(${final_simplified2_in_denominator})^3+((${final_simplified2_in_denominator})^2)*((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))+(${final_simplified2_in_denominator})*(((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2)+((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^3`;
                                    full_Expression_denominator_final = `(${final_simplified2_in_denominator})^4-(${final_simplified_Root1_in_denominator})`;
                                } else {
                                    html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                    return html;
                                }
                            } else {
                                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                return html;
                            }
                        } else if (full_Expression_denominator === `${expression_with_fraction_denominator.signs[0]}(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})` || full_Expression_numerator === `(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})`) {
                            html += `<div>В данном случае сопряжённое выражение будет представлять из себя исходный корень.</div>`;
                            full_Expression_denominator_dop = `(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})`;
                            if (expression_with_fraction_denominator.signs[0] === '+') {
                                full_Expression_denominator_final = `(${final_simplified_Root1_in_denominator})`;
                            } else {
                                full_Expression_denominator_final = `${expression_with_fraction_denominator.signs[0]}(${final_simplified_Root1_in_denominator})`;
                            }
                        }
                        else {
                            html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                            return html;
                        }
                    } else {
                        if (full_Expression_denominator === `(${final_simplified2_in_denominator})${expression_with_fraction_denominator.signs[0]}(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})`) {
                            if (expression_with_fraction_denominator.signs[0] === '+') {
                                if (expression_with_fraction_denominator.denominators[0] === '2') {
                                    html += `<div>Степень корня в знаменателе равна двум, следовательно необходимо применить такую формулу сокращённого умножения, как разность квадратов: a<sup>2</sup>-b<sup>2</sup>=(a-b)(a+b).</div>`;
                                    full_Expression_denominator_dop = `(${final_simplified2_in_denominator})-(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})`;
                                    full_Expression_denominator_final = `(${final_simplified2_in_denominator})^2-(${final_simplified_Root1_in_denominator})^${expression_with_fraction_denominator.numerators[0]}`;
                                } else if (expression_with_fraction_denominator.denominators[0] === '3') {
                                    html += `<div>Степень корня в знаменателе равна трём, следовательно необходимо применить такие формулы сокращённого умножения, как разность или сумма кубов (в зависимости от знака между корнями): a<sup>3</sup>-b<sup>3</sup>=(a-b)(a<sup>2</sup>+a*b+b<sup>2</sup>) или a<sup>3</sup>+b<sup>3</sup>=(a+b)(a<sup>2</sup>-a*b+b<sup>2</sup>) соотственно.</div>`;
                                    full_Expression_denominator_dop = `(${final_simplified2_in_denominator})^2-(${final_simplified2_in_denominator})*((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))+((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2`;
                                    full_Expression_denominator_final = `(${final_simplified2_in_denominator})^3)+(${final_simplified_Root1_in_denominator})^${expression_with_fraction_denominator.numerators[0]}`;
                                } else if (expression_with_fraction_denominator.denominators[0] === '4') {
                                    html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                    return html;
                                } else {
                                    html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                    return html;
                                }
                            } else if (expression_with_fraction_denominator.signs[0] === '-') {
                                if (expression_with_fraction_denominator.denominators[0] === '2') {
                                    html += `<div>Степень корня в знаменателе равна двум, следовательно необходимо применить такую формулу сокращённого умножения, как разность квадратов: a<sup>2</sup>-b<sup>2</sup>=(a-b)(a+b).</div>`;
                                    full_Expression_denominator_dop = `(${final_simplified2_in_denominator})+(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})`;
                                    full_Expression_denominator_final = `(${final_simplified2_in_denominator})^2-(${final_simplified_Root1_in_denominator})^${expression_with_fraction_denominator.numerators[0]}`;
                                } else if (expression_with_fraction_denominator.denominators[0] === '3') {
                                    html += `<div>Степень корня в знаменателе равна трём, следовательно необходимо применить такие формулы сокращённого умножения, как разность или сумма кубов (в зависимости от знака между корнями): a<sup>3</sup>-b<sup>3</sup>=(a-b)(a<sup>2</sup>+a*b+b<sup>2</sup>) или a<sup>3</sup>+b<sup>3</sup>=(a+b)(a<sup>2</sup>-a*b+b<sup>2</sup>) соотственно.</div>`;
                                    full_Expression_denominator_dop = `(${final_simplified2_in_denominator})^2+(${final_simplified2_in_denominator})*((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))+((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2`;
                                    full_Expression_denominator_final = `(${final_simplified2_in_denominator})^3-(${final_simplified_Root1_in_denominator})^${expression_with_fraction_denominator.numerators[0]}`;
                                } else if (expression_with_fraction_denominator.denominators[0] === '4') {
                                    html += `<div>Степень корня в знаменателе равна четырём, следовательно необходимо применить такую формулу сокращённого умножения, как: a<sup>4</sup>-b<sup>4</sup>=(a-b)(a<sup>3</sup>+a<sup>2</sup>*b+a*b<sup>2</sup>+b<sup>3</sup>).</div>`;
                                    full_Expression_denominator_dop = `(${final_simplified2_in_denominator})^3+((${final_simplified2_in_denominator})^2)*((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))+(${final_simplified2_in_denominator})*(((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2)+((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^3`;
                                    full_Expression_denominator_final = `(${final_simplified2_in_denominator})^4-(${final_simplified_Root1_in_denominator})^${expression_with_fraction_denominator.numerators[0]}`;
                                } else {
                                    html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                    return html;
                                }
                            } else {
                                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                return html;
                            }
                        } else if (full_Expression_denominator === `${expression_with_fraction_denominator.signs[0]}(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})` || full_Expression_numerator === `(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})`) {
                            html += `<div>В данном случае сопряжённое выражение будет представлять из себя исходный корень.</div>`;
                            full_Expression_denominator_dop = `(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})`;
                            if (expression_with_fraction_denominator.signs[0] === '+') {
                                full_Expression_denominator_final = `(${final_simplified_Root1_in_denominator})^${expression_with_fraction_denominator.numerators[0]}`;
                            } else {
                                full_Expression_denominator_final = `${expression_with_fraction_denominator.signs[0]}(${final_simplified_Root1_in_denominator})^${expression_with_fraction_denominator.numerators[0]}`;
                            }
                        }
                        else {
                            html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                            return html;
                        }
                    }
                } else {
                    html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                    return html;
                }
                renderedStep = format_Formula_For_MathJax(full_Expression_denominator_dop);

                html += `<div>Таким образом, сопряжённое выражение для знаменателя будет иметь вид:</div>
                                <div class="mathjax-text">\\[${renderedStep}\\] </div>`;


                html += `<div>Т.к. и в числителе, и в знаменателе добавились сопряжённые выражения, необходимо числитель умножить и на собственное сопряжённое выражение и на сопряжённое выражения знаменателя. С знаменателем необходимо выполнить такие же действия, но умножить как на своё сопряжённое выржаение, так и на сопряжённое выражение числителя. Данный шаг делается для того, чтобы исходная дробь не потеряла своё значение и множители, что добавились как в числителе, так и в знаменателе, могли сократиться и представить из себя единицу. Числитель будет иметь вид:</div>`;
                num_vr1 = `(${full_Expression_numerator})`;
                general_vr2 = `(${full_Expression_numerator_dop})`;
                general_vr3 = `(${full_Expression_denominator_dop})`;

                let renderedStep_vr_1_1 = format_Formula_For_MathJax(num_vr1);
                let renderedStep_vr_1_2 = format_Formula_For_MathJax(general_vr2);
                let renderedStep_vr_1_3 = format_Formula_For_MathJax(general_vr3);
                full_num_vr = `${renderedStep_vr_1_1}\\cdot${renderedStep_vr_1_2}\\cdot${renderedStep_vr_1_3}`;

                den_vr1 = `(${full_Expression_denominator})`;
                let renderedStep_vr_2_1 = format_Formula_For_MathJax(den_vr1);
                full_den_vr = `${renderedStep_vr_2_1}\\cdot${renderedStep_vr_1_2}\\cdot${renderedStep_vr_1_3}`;

                full_vr = `\\frac{${full_num_vr}}{${full_den_vr}}`;
                html += `<div class="mathjax-text">\\[${full_num_vr}\\] </div>
                <div>Знаменатель примет вид:</div>
                <div class="mathjax-text">\\[${full_den_vr}\\] </div>
                <div>Обновлённая дробь:</div>
                <div class="mathjax-text">\\[${full_vr}\\] </div>`;

                let renderedStep_vr_3_1 = format_Formula_For_MathJax(full_Expression_numerator_final);
                let renderedStep_vr_3_2 = format_Formula_For_MathJax(full_Expression_denominator_final);
                console.log(full_Expression_numerator_final);

                html += `<div>Хоть сейчас дробь и выглядит пугающе, бояться не стоит. Теперь необходимо применить формулы сокращённого умножения. В числителе есть пара, которую можно объединить по формуле сокращённого умножения, упоминавшейся при объяснении поиска сопряжённого выражения:</div>
                <div class="mathjax-text">\\[${renderedStep_vr_1_1}\\cdot${renderedStep_vr_1_2} = ${renderedStep_vr_3_1}\\]</div>
                <div>Также можно поступить и с знаменателем:</div>
                <div class="mathjax-text">\\[${renderedStep_vr_2_1}\\cdot${renderedStep_vr_1_3} = ${renderedStep_vr_3_2}\\]</div>
                <div>Тогда дробь примет вид:</div>`;
                full_num_vr = `\\left(${renderedStep_vr_3_1}\\right)\\cdot${renderedStep_vr_1_3}`;
                full_den_vr = `\\left(${renderedStep_vr_3_2}\\right)\\cdot${renderedStep_vr_1_2}`;
                full_vr = `\\frac{${full_num_vr}}{${full_den_vr}}`;
                html += `<div class="mathjax-text">\\[${full_vr}\\]</div>`;

                part_numerator = simplifyExpression_basic(full_Expression_numerator_final).factorizedExpr;
                part_denominator = simplifyExpression_basic(full_Expression_denominator_final).factorizedExpr;
                renderedStep_vr_3_1 = format_Formula_For_MathJax(part_numerator);
                renderedStep_vr_3_2 = format_Formula_For_MathJax(part_denominator);
                full_num_vr = `\\left(${renderedStep_vr_3_1}\\right)\\cdot${renderedStep_vr_1_3}`;
                full_den_vr = `\\left(${renderedStep_vr_3_2}\\right)\\cdot${renderedStep_vr_1_2}`;
                full_vr = `\\frac{${full_num_vr}}{${full_den_vr}}`;
                html += `<div>Также данную дробь можно записать в виде:</div>
                <div class="mathjax-text">\\[${full_vr}\\]</div>
                <div>Теперь можно приступить к упрощению дроби.</div>`;

                complete_non_simplified_expression = `((${part_numerator})*(${full_Expression_denominator_dop}))/((${part_denominator})*(${full_Expression_numerator_dop}))`
            } else if (expression_with_fraction_numerator.has_Root) {
                html += `<div>Как можем заметить, корни пристутствуют в числителе. Рассмотрим степень или степени корней в числителе (если это целесообразно) и выведем сопряжённое выражение.</div>`;
                

                //числитель
                if (expression_with_fraction_numerator.bases.length === 2) {
                    
                    if (expression_with_fraction_numerator.numerators[0] === '1' && expression_with_fraction_numerator.numerators[1] === '1') {
                        
                        if (expression_with_fraction_numerator.denominators[0] === '2' && expression_with_fraction_numerator.denominators[1] === '2') {
                            html += `<div>Степени корней в числителе равны двум, следовательно необходимо применить такую формулу сокращённого умножения, как разность квадратов: a<sup>2</sup>-b<sup>2</sup>=(a-b)(a+b).</div>`;
                            if (expression_with_fraction_numerator.signs[0] === '-' && expression_with_fraction_numerator.signs[1] === '+') {
                                full_Expression_numerator_dop = `(${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]})+(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})`;
                                full_Expression_numerator_final = `(${final_simplified_Root2_in_numerator})-(${final_simplified_Root1_in_numerator})`;
                            } else if (expression_with_fraction_numerator.signs[0] === '+' && expression_with_fraction_numerator.signs[1] === '-') {
                                full_Expression_numerator_dop = `(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})+(${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]})`;
                                full_Expression_numerator_final = `(${final_simplified_Root1_in_numerator})-(${final_simplified_Root2_in_numerator})`;
                            } else if (expression_with_fraction_numerator.signs[0] === '-' && expression_with_fraction_numerator.signs[1] === '-') {
                                full_Expression_numerator_dop = `(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})-(${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]})`;
                                full_Expression_numerator_final = `-((${final_simplified_Root1_in_numerator})-(${final_simplified_Root2_in_numerator}))`;
                            } else if (expression_with_fraction_numerator.signs[0] === '+' && expression_with_fraction_numerator.signs[1] === '+') {
                                full_Expression_numerator_dop = `(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})-(${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]})`;
                                full_Expression_numerator_final = `(${final_simplified_Root1_in_numerator})-(${final_simplified_Root2_in_numerator})`;
                            } else if (full_Expression_numerator === `${expression_with_fraction_numerator.signs[0]}(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})${expression_with_fraction_numerator.signs[0]}(${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]})`) {
                                if (expression_with_fraction_numerator.signs[0] === '+' && expression_with_fraction_numerator.signs[1] === '-') {
                                    full_Expression_numerator_dop = `(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})+(${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]})`;
                                    full_Expression_numerator_final = `(${final_simplified_Root1_in_numerator})-(${final_simplified_Root2_in_numerator})`;
                                } else if (expression_with_fraction_numerator.signs[0] === '-' && expression_with_fraction_numerator.signs[1] === '+') {
                                    full_Expression_numerator_dop = `(${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]})+(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})`;
                                    full_Expression_numerator_final = `(${final_simplified_Root2_in_numerator})-(${final_simplified_Root1_in_numerator})`;
                                } else {
                                    html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                    return html;
                                }
                            } else {
                                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                return html;
                            }

                        } else if (expression_with_fraction_numerator.denominators[0] === '3' && expression_with_fraction_numerator.denominators[1] === '3') {
                            html += `<div>Степени корней в числителе равны трём, следовательно необходимо применить такие формулы сокращённого умножения, как разность или сумма кубов (в зависимости от знака между корнями): a<sup>3</sup>-b<sup>3</sup>=(a-b)(a<sup>2</sup>+a*b+b<sup>2</sup>) или a<sup>3</sup>+b<sup>3</sup>=(a+b)(a<sup>2</sup>-a*b+b<sup>2</sup>) соотственно.</div>`;
                            if (expression_with_fraction_numerator.signs[0] === '-' && expression_with_fraction_numerator.signs[1] === '+') {
                                full_Expression_numerator_dop = `((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^2+((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))*((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))+((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2`;
                                full_Expression_numerator_final = `(${final_simplified_Root2_in_numerator})-(${final_simplified_Root1_in_numerator})`;
                            } else if (expression_with_fraction_numerator.signs[0] === '+' && expression_with_fraction_numerator.signs[1] === '-') {
                                full_Expression_numerator_dop = `((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2+((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))*((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))+((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^2`;
                                full_Expression_numerator_final = `(${final_simplified_Root1_in_numerator})-(${final_simplified_Root2_in_numerator})`;
                            } else if (expression_with_fraction_numerator.signs[0] === '-' && expression_with_fraction_numerator.signs[1] === '-') {
                                full_Expression_numerator_dop = `((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2-((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))*((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))+((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^2`;
                                full_Expression_numerator_final = `-((${final_simplified_Root1_in_numerator})+(${final_simplified_Root2_in_numerator}))`;
                            } else if (expression_with_fraction_numerator.signs[0] === '+' && expression_with_fraction_numerator.signs[1] === '+') {
                                full_Expression_numerator_dop = `((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2-((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))*((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))+((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^2`;
                                full_Expression_numerator_final = `(${final_simplified_Root1_in_numerator})+(${final_simplified_Root2_in_numerator})`;
                            } else if (full_Expression_numerator === `${expression_with_fraction_numerator.signs[0]}(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})${expression_with_fraction_numerator.signs[0]}(${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]})`) {
                                if (expression_with_fraction_numerator.signs[0] === '+' && expression_with_fraction_numerator.signs[1] === '-') {
                                    full_Expression_numerator_dop = `((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2+((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))*((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))+((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^2`;
                                    full_Expression_numerator_final = `(${final_simplified_Root1_in_numerator})-(${final_simplified_Root2_in_numerator})`;
                                } else if (expression_with_fraction_numerator.signs[0] === '-' && expression_with_fraction_numerator.signs[1] === '+') {
                                    full_Expression_numerator_dop = `((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^2+((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))*((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))+((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2`;
                                    full_Expression_numerator_final = `(${final_simplified_Root2_in_numerator})-(${final_simplified_Root1_in_numerator})`;
                                } else {
                                    html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                    return html;
                                }
                            } else {
                                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                return html;
                            }
                        } else if (expression_with_fraction_numerator.denominators[0] === '4' && expression_with_fraction_numerator.denominators[1] === '4') {
                            html += `<div>Степени корней в числителе равны четырём, следовательно необходимо применить такую формулу сокращённого умножения, как: a<sup>4</sup>-b<sup>4</sup>=(a-b)(a<sup>3</sup>+a<sup>2</sup>*b+a*b<sup>2</sup>+b<sup>3</sup>).</div>`;
                            if (expression_with_fraction_numerator.signs[0] === '-' && expression_with_fraction_numerator.signs[1] === '+') {
                                full_Expression_numerator_dop = `((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^3+(((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^2)*((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))+((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))*(((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2)+((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^3`;
                                full_Expression_numerator_final = `(${final_simplified_Root2_in_numerator})-(${final_simplified_Root1_in_numerator})`;
                            } else if (expression_with_fraction_numerator.signs[0] === '+' && expression_with_fraction_numerator.signs[1] === '-') {
                                full_Expression_numerator_dop = `((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^3+(((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2)*((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))+((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))*(((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^2)+((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^3`;
                                full_Expression_numerator_final = `(${final_simplified_Root1_in_numerator})-(${final_simplified_Root2_in_numerator})`;
                            } else if (expression_with_fraction_numerator.signs[0] === '-' && expression_with_fraction_numerator.signs[1] === '-') {
                                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                return html;
                            } else if (expression_with_fraction_numerator.signs[0] === '+' && expression_with_fraction_numerator.signs[1] === '+') {
                                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                return html;
                            } else if (full_Expression_numerator === `${expression_with_fraction_numerator.signs[0]}(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})${expression_with_fraction_numerator.signs[0]}(${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]})`) {
                                if (expression_with_fraction_numerator.signs[0] === '+' && expression_with_fraction_numerator.signs[1] === '-') {
                                    full_Expression_numerator_dop = `((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^3+(((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2)*((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))+((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))*(((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^2)+((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^3`;
                                    full_Expression_numerator_final = `(${final_simplified_Root1_in_numerator})-(${final_simplified_Root2_in_numerator})`;
                                } else if (expression_with_fraction_numerator.signs[0] === '-' && expression_with_fraction_numerator.signs[1] === '+') {
                                    full_Expression_numerator_dop = `((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^3+(((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^2)*((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))+((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))*(((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2)+((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^3`;
                                    full_Expression_numerator_final = `(${final_simplified_Root2_in_numerator})-(${final_simplified_Root1_in_numerator})`;
                                } else {
                                    html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                    return html;
                                }
                            } else {
                                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                return html;
                            }
                        } else {
                            html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                            return html;
                        }
                    } else if (expression_with_fraction_numerator.numerators[0] === '1') {
                        if (expression_with_fraction_numerator.denominators[0] === '2' && expression_with_fraction_numerator.denominators[1] === '2') {
                            html += `<div>Степени корней в числителе равны двум, следовательно необходимо применить такую формулу сокращённого умножения, как разность квадратов: a<sup>2</sup>-b<sup>2</sup>=(a-b)(a+b).</div>`;
                            if (expression_with_fraction_numerator.signs[0] === '-' && expression_with_fraction_numerator.signs[1] === '+') {
                                full_Expression_numerator_dop = `(${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]})+(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})`;
                                full_Expression_numerator_final = `(${final_simplified_Root2_in_numerator})^${expression_with_fraction_numerator.numerators[1]}-(${final_simplified_Root1_in_numerator})`;
                            } else if (expression_with_fraction_numerator.signs[0] === '+' && expression_with_fraction_numerator.signs[1] === '-') {
                                full_Expression_numerator_dop = `(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})+(${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]})`;
                                full_Expression_numerator_final = `(${final_simplified_Root1_in_numerator})-(${final_simplified_Root2_in_numerator})^${expression_with_fraction_numerator.numerators[1]}`;
                            } else if (expression_with_fraction_numerator.signs[0] === '-' && expression_with_fraction_numerator.signs[1] === '-') {
                                full_Expression_numerator_dop = `(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})-(${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]})`;
                                full_Expression_numerator_final = `-((${final_simplified_Root1_in_numerator})-(${final_simplified_Root2_in_numerator})^${expression_with_fraction_numerator.numerators[1]})`;
                            } else if (expression_with_fraction_numerator.signs[0] === '+' && expression_with_fraction_numerator.signs[1] === '+') {
                                full_Expression_numerator_dop = `(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})-(${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]})`;
                                full_Expression_numerator_final = `(${final_simplified_Root1_in_numerator})-(${final_simplified_Root2_in_numerator})^${expression_with_fraction_numerator.numerators[1]}`;
                            } else if (full_Expression_numerator === `${expression_with_fraction_numerator.signs[0]}(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})${expression_with_fraction_numerator.signs[0]}(${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]})`) {
                                if (expression_with_fraction_numerator.signs[0] === '+' && expression_with_fraction_numerator.signs[1] === '-') {
                                    full_Expression_numerator_dop = `(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})+(${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]})`;
                                    full_Expression_numerator_final = `(${final_simplified_Root1_in_numerator})-(${final_simplified_Root2_in_numerator})^${expression_with_fraction_numerator.numerators[1]}`;
                                } else if (expression_with_fraction_numerator.signs[0] === '-' && expression_with_fraction_numerator.signs[1] === '+') {
                                    full_Expression_numerator_dop = `(${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]})+(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})`;
                                    full_Expression_numerator_final = `(${final_simplified_Root2_in_numerator})^${expression_with_fraction_numerator.numerators[1]}-(${final_simplified_Root1_in_numerator})`;
                                } else {
                                    html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                    return html;
                                }
                            } else {
                                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                return html;
                            }

                        } else if (expression_with_fraction_numerator.denominators[0] === '3' && expression_with_fraction_numerator.denominators[1] === '3') {
                            html += `<div>Степени корней в числителе равны трём, следовательно необходимо применить такие формулы сокращённого умножения, как разность или сумма кубов (в зависимости от знака между корнями): a<sup>3</sup>-b<sup>3</sup>=(a-b)(a<sup>2</sup>+a*b+b<sup>2</sup>) или a<sup>3</sup>+b<sup>3</sup>=(a+b)(a<sup>2</sup>-a*b+b<sup>2</sup>) соотственно.</div>`;
                            if (expression_with_fraction_numerator.signs[0] === '-' && expression_with_fraction_numerator.signs[1] === '+') {
                                full_Expression_numerator_dop = `((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^2+((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))*((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))+((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2`;
                                full_Expression_numerator_final = `(${final_simplified_Root2_in_numerator})^${expression_with_fraction_numerator.numerators[1]}-(${final_simplified_Root1_in_numerator})`;
                            } else if (expression_with_fraction_numerator.signs[0] === '+' && expression_with_fraction_numerator.signs[1] === '-') {
                                full_Expression_numerator_dop = `((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2+((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))*((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))+((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^2`;
                                full_Expression_numerator_final = `(${final_simplified_Root1_in_numerator})-(${final_simplified_Root2_in_numerator})^${expression_with_fraction_numerator.numerators[1]}`;
                            } else if (expression_with_fraction_numerator.signs[0] === '-' && expression_with_fraction_numerator.signs[1] === '-') {
                                full_Expression_numerator_dop = `((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2-((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))*((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))+((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^2`;
                                full_Expression_numerator_final = `-((${final_simplified_Root1_in_numerator})+(${final_simplified_Root2_in_numerator})^${expression_with_fraction_numerator.numerators[1]})`;
                            } else if (expression_with_fraction_numerator.signs[0] === '+' && expression_with_fraction_numerator.signs[1] === '+') {
                                full_Expression_numerator_dop = `((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2-((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))*((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))+((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^2`;
                                full_Expression_numerator_final = `(${final_simplified_Root1_in_numerator})+(${final_simplified_Root2_in_numerator})^${expression_with_fraction_numerator.numerators[1]}`;
                            } else if (full_Expression_numerator === `${expression_with_fraction_numerator.signs[0]}(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})${expression_with_fraction_numerator.signs[0]}(${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]})`) {
                                if (expression_with_fraction_numerator.signs[0] === '+' && expression_with_fraction_numerator.signs[1] === '-') {
                                    full_Expression_numerator_dop = `((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2+((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))*((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))+((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^2`;
                                    full_Expression_numerator_final = `(${final_simplified_Root1_in_numerator})-(${final_simplified_Root2_in_numerator})^${expression_with_fraction_numerator.numerators[1]}`;
                                } else if (expression_with_fraction_numerator.signs[0] === '-' && expression_with_fraction_numerator.signs[1] === '+') {
                                    full_Expression_numerator_dop = `((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^2+((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))*((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))+((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2`;
                                    full_Expression_numerator_final = `(${final_simplified_Root2_in_numerator})^${expression_with_fraction_numerator.numerators[1]}-(${final_simplified_Root1_in_numerator})`;
                                } else {
                                    html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                    return html;
                                }
                            } else {
                                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                return html;
                            }
                        } else if (expression_with_fraction_numerator.denominators[0] === '4' && expression_with_fraction_numerator.denominators[1] === '4') {
                            html += `<div>Степени корней в числителе равны четырём, следовательно необходимо применить такую формулу сокращённого умножения, как: a<sup>4</sup>-b<sup>4</sup>=(a-b)(a<sup>3</sup>+a<sup>2</sup>*b+a*b<sup>2</sup>+b<sup>3</sup>).</div>`;
                            if (expression_with_fraction_numerator.signs[0] === '-' && expression_with_fraction_numerator.signs[1] === '+') {
                                full_Expression_numerator_dop = `((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^3+(((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^2)*((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))+((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))*(((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2)+((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^3`;
                                full_Expression_numerator_final = `(${final_simplified_Root2_in_numerator})^${expression_with_fraction_numerator.numerators[1]}-(${final_simplified_Root1_in_numerator})`;
                            } else if (expression_with_fraction_numerator.signs[0] === '+' && expression_with_fraction_numerator.signs[1] === '-') {
                                full_Expression_numerator_dop = `((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^3+(((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2)*((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))+((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))*(((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^2)+((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^3`;
                                full_Expression_numerator_final = `(${final_simplified_Root1_in_numerator})-(${final_simplified_Root2_in_numerator})^${expression_with_fraction_numerator.numerators[1]}`;
                            } else if (expression_with_fraction_numerator.signs[0] === '-' && expression_with_fraction_numerator.signs[1] === '-') {
                                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                return html;
                            } else if (expression_with_fraction_numerator.signs[0] === '+' && expression_with_fraction_numerator.signs[1] === '+') {
                                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                return html;
                            } else if (full_Expression_numerator === `${expression_with_fraction_numerator.signs[0]}(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})${expression_with_fraction_numerator.signs[0]}(${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]})`) {
                                if (expression_with_fraction_numerator.signs[0] === '+' && expression_with_fraction_numerator.signs[1] === '-') {
                                    full_Expression_numerator_dop = `((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^3+(((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2)*((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))+((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))*(((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^2)+((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^3`;
                                    full_Expression_numerator_final = `(${final_simplified_Root1_in_numerator})-(${final_simplified_Root2_in_numerator})^${expression_with_fraction_numerator.numerators[1]}`;
                                } else if (expression_with_fraction_numerator.signs[0] === '-' && expression_with_fraction_numerator.signs[1] === '+') {
                                    full_Expression_numerator_dop = `((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^3+(((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^2)*((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))+((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))*(((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2)+((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^3`;
                                    full_Expression_numerator_final = `(${final_simplified_Root2_in_numerator})^${expression_with_fraction_numerator.numerators[1]}-(${final_simplified_Root1_in_numerator})`;
                                } else {
                                    html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                    return html;
                                }
                            } else {
                                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                return html;
                            }
                        } else {
                            html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                            return html;
                        }
                    } else if (expression_with_fraction_numerator.numerators[1] === '1') {
                        if (expression_with_fraction_numerator.denominators[0] === '2' && expression_with_fraction_numerator.denominators[1] === '2') {
                            html += `<div>Степени корней в числителе равны двум, следовательно необходимо применить такую формулу сокращённого умножения, как разность квадратов: a<sup>2</sup>-b<sup>2</sup>=(a-b)(a+b).</div>`;
                            if (expression_with_fraction_numerator.signs[0] === '-' && expression_with_fraction_numerator.signs[1] === '+') {
                                full_Expression_numerator_dop = `(${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]})+(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})`;
                                full_Expression_numerator_final = `(${final_simplified_Root2_in_numerator})-(${final_simplified_Root1_in_numerator})^${expression_with_fraction_numerator.numerators[0]}`;
                            } else if (expression_with_fraction_numerator.signs[0] === '+' && expression_with_fraction_numerator.signs[1] === '-') {
                                full_Expression_numerator_dop = `(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})+(${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]})`;
                                full_Expression_numerator_final = `(${final_simplified_Root1_in_numerator})^${expression_with_fraction_numerator.numerators[0]}-(${final_simplified_Root2_in_numerator})`;
                            } else if (expression_with_fraction_numerator.signs[0] === '-' && expression_with_fraction_numerator.signs[1] === '-') {
                                full_Expression_numerator_dop = `(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})-(${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]})`;
                                full_Expression_numerator_final = `-((${final_simplified_Root1_in_numerator})^${expression_with_fraction_numerator.numerators[0]}-(${final_simplified_Root2_in_numerator})`;
                            } else if (expression_with_fraction_numerator.signs[0] === '+' && expression_with_fraction_numerator.signs[1] === '+') {
                                full_Expression_numerator_dop = `(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})-(${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]})`;
                                full_Expression_numerator_final = `(${final_simplified_Root1_in_numerator})^${expression_with_fraction_numerator.numerators[0]}-(${final_simplified_Root2_in_numerator})`;
                            } else if (full_Expression_numerator === `${expression_with_fraction_numerator.signs[0]}(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})${expression_with_fraction_numerator.signs[0]}(${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]})`) {
                                if (expression_with_fraction_numerator.signs[0] === '+' && expression_with_fraction_numerator.signs[1] === '-') {
                                    full_Expression_numerator_dop = `(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})+(${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]})`;
                                    full_Expression_numerator_final = `(${final_simplified_Root1_in_numerator})^${expression_with_fraction_numerator.numerators[0]}-(${final_simplified_Root2_in_numerator})`;
                                } else if (expression_with_fraction_numerator.signs[0] === '-' && expression_with_fraction_numerator.signs[1] === '+') {
                                    full_Expression_numerator_dop = `(${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]})+(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})`;
                                    full_Expression_numerator_final = `(${final_simplified_Root2_in_numerator})-(${final_simplified_Root1_in_numerator})^${expression_with_fraction_numerator.numerators[0]}`;
                                } else {
                                    html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                    return html;
                                }
                            } else {
                                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                return html;
                            }

                        } else if (expression_with_fraction_numerator.denominators[0] === '3' && expression_with_fraction_numerator.denominators[1] === '3') {
                            html += `<div>Степени корней в числителе равны трём, следовательно необходимо применить такие формулы сокращённого умножения, как разность или сумма кубов (в зависимости от знака между корнями): a<sup>3</sup>-b<sup>3</sup>=(a-b)(a<sup>2</sup>+a*b+b<sup>2</sup>) или a<sup>3</sup>+b<sup>3</sup>=(a+b)(a<sup>2</sup>-a*b+b<sup>2</sup>) соотственно.</div>`;
                            if (expression_with_fraction_numerator.signs[0] === '-' && expression_with_fraction_numerator.signs[1] === '+') {
                                full_Expression_numerator_dop = `((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^2+((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))*((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))+((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2`;
                                full_Expression_numerator_final = `(${final_simplified_Root2_in_numerator})-(${final_simplified_Root1_in_numerator})^${expression_with_fraction_numerator.numerators[0]}`;
                            } else if (expression_with_fraction_numerator.signs[0] === '+' && expression_with_fraction_numerator.signs[1] === '-') {
                                full_Expression_numerator_dop = `((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2+((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))*((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))+((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^2`;
                                full_Expression_numerator_final = `(${final_simplified_Root1_in_numerator})^${expression_with_fraction_numerator.numerators[0]}-(${final_simplified_Root2_in_numerator})`;
                            } else if (expression_with_fraction_numerator.signs[0] === '-' && expression_with_fraction_numerator.signs[1] === '-') {
                                full_Expression_numerator_dop = `((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2-((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))*((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))+((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^2`;
                                full_Expression_numerator_final = `-((${final_simplified_Root1_in_numerator})^${expression_with_fraction_numerator.numerators[0]}+(${final_simplified_Root2_in_numerator})`;
                            } else if (expression_with_fraction_numerator.signs[0] === '+' && expression_with_fraction_numerator.signs[1] === '+') {
                                full_Expression_numerator_dop = `((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2-((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))*((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))+((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^2`;
                                full_Expression_numerator_final = `(${final_simplified_Root1_in_numerator})^${expression_with_fraction_numerator.numerators[0]}+(${final_simplified_Root2_in_numerator})`;
                            } else if (full_Expression_numerator === `${expression_with_fraction_numerator.signs[0]}(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})${expression_with_fraction_numerator.signs[0]}(${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]})`) {
                                if (expression_with_fraction_numerator.signs[0] === '+' && expression_with_fraction_numerator.signs[1] === '-') {
                                    full_Expression_numerator_dop = `((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2+((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))*((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))+((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^2`;
                                    full_Expression_numerator_final = `(${final_simplified_Root1_in_numerator})^${expression_with_fraction_numerator.numerators[0]}-(${final_simplified_Root2_in_numerator})`;
                                } else if (expression_with_fraction_numerator.signs[0] === '-' && expression_with_fraction_numerator.signs[1] === '+') {
                                    full_Expression_numerator_dop = `((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^2+((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))*((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))+((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2`;
                                    full_Expression_numerator_final = `(${final_simplified_Root2_in_numerator})-(${final_simplified_Root1_in_numerator})^${expression_with_fraction_numerator.numerators[0]}`;
                                } else {
                                    html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                    return html;
                                }
                            } else {
                                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                return html;
                            }
                        } else if (expression_with_fraction_numerator.denominators[0] === '4' && expression_with_fraction_numerator.denominators[1] === '4') {
                            html += `<div>Степени корней в числителе равны четырём, следовательно необходимо применить такую формулу сокращённого умножения, как: a<sup>4</sup>-b<sup>4</sup>=(a-b)(a<sup>3</sup>+a<sup>2</sup>*b+a*b<sup>2</sup>+b<sup>3</sup>).</div>`;
                            if (expression_with_fraction_numerator.signs[0] === '-' && expression_with_fraction_numerator.signs[1] === '+') {
                                full_Expression_numerator_dop = `((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^3+(((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^2)*((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))+((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))*(((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2)+((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^3`;
                                full_Expression_numerator_final = `(${final_simplified_Root2_in_numerator})-(${final_simplified_Root1_in_numerator})^${expression_with_fraction_numerator.numerators[0]}`;
                            } else if (expression_with_fraction_numerator.signs[0] === '+' && expression_with_fraction_numerator.signs[1] === '-') {
                                full_Expression_numerator_dop = `((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^3+(((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2)*((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))+((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))*(((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^2)+((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^3`;
                                full_Expression_numerator_final = `(${final_simplified_Root1_in_numerator})^${expression_with_fraction_numerator.numerators[0]}-(${final_simplified_Root2_in_numerator})`;
                            } else if (expression_with_fraction_numerator.signs[0] === '-' && expression_with_fraction_numerator.signs[1] === '-') {
                                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                return html;
                            } else if (expression_with_fraction_numerator.signs[0] === '+' && expression_with_fraction_numerator.signs[1] === '+') {
                                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                return html;
                            } else if (full_Expression_numerator === `${expression_with_fraction_numerator.signs[0]}(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})${expression_with_fraction_numerator.signs[0]}(${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]})`) {
                                if (expression_with_fraction_numerator.signs[0] === '+' && expression_with_fraction_numerator.signs[1] === '-') {
                                    full_Expression_numerator_dop = `((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^3+(((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2)*((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))+((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))*(((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^2)+((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^3`;
                                    full_Expression_numerator_final = `(${final_simplified_Root1_in_numerator})^${expression_with_fraction_numerator.numerators[0]}-(${final_simplified_Root2_in_numerator})`;
                                } else if (expression_with_fraction_numerator.signs[0] === '-' && expression_with_fraction_numerator.signs[1] === '+') {
                                    full_Expression_numerator_dop = `((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^3+(((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^2)*((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))+((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))*(((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2)+((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^3`;
                                    full_Expression_numerator_final = `(${final_simplified_Root2_in_numerator})-(${final_simplified_Root1_in_numerator})^${expression_with_fraction_numerator.numerators[0]}`;
                                } else {
                                    html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                    return html;
                                }
                            } else {
                                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                return html;
                            }
                        } else {
                            html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                            return html;
                        }
                    } else {
                        if (expression_with_fraction_numerator.denominators[0] === '2' && expression_with_fraction_numerator.denominators[1] === '2') {
                            html += `<div>Степени корней в числителе равны двум, следовательно необходимо применить такую формулу сокращённого умножения, как разность квадратов: a<sup>2</sup>-b<sup>2</sup>=(a-b)(a+b).</div>`;
                            if (expression_with_fraction_numerator.signs[0] === '-' && expression_with_fraction_numerator.signs[1] === '+') {
                                full_Expression_numerator_dop = `(${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]})+(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})`;
                                full_Expression_numerator_final = `(${final_simplified_Root2_in_numerator})^${expression_with_fraction_numerator.numerators[1]}-(${final_simplified_Root1_in_numerator})^${expression_with_fraction_numerator.numerators[0]}`;
                            } else if (expression_with_fraction_numerator.signs[0] === '+' && expression_with_fraction_numerator.signs[1] === '-') {
                                full_Expression_numerator_dop = `(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})+(${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]})`;
                                full_Expression_numerator_final = `(${final_simplified_Root1_in_numerator})^${expression_with_fraction_numerator.numerators[0]}-(${final_simplified_Root2_in_numerator})^${expression_with_fraction_numerator.numerators[1]}`;
                            } else if (expression_with_fraction_numerator.signs[0] === '-' && expression_with_fraction_numerator.signs[1] === '-') {
                                full_Expression_numerator_dop = `(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})-(${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]})`;
                                full_Expression_numerator_final = `-((${final_simplified_Root1_in_numerator})^${expression_with_fraction_numerator.numerators[0]}-(${final_simplified_Root2_in_numerator})^${expression_with_fraction_numerator.numerators[1]})`;
                            } else if (expression_with_fraction_numerator.signs[0] === '+' && expression_with_fraction_numerator.signs[1] === '+') {
                                full_Expression_numerator_dop = `(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})-(${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]})`;
                                full_Expression_numerator_final = `(${final_simplified_Root1_in_numerator})^${expression_with_fraction_numerator.numerators[0]}-(${final_simplified_Root2_in_numerator})^${expression_with_fraction_numerator.numerators[1]}`;
                            } else if (full_Expression_numerator === `${expression_with_fraction_numerator.signs[0]}(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})${expression_with_fraction_numerator.signs[0]}(${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]})`) {
                                if (expression_with_fraction_numerator.signs[0] === '+' && expression_with_fraction_numerator.signs[1] === '-') {
                                    full_Expression_numerator_dop = `(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})+(${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]})`;
                                    full_Expression_numerator_final = `(${final_simplified_Root1_in_numerator})^${expression_with_fraction_numerator.numerators[0]}-(${final_simplified_Root2_in_numerator})^${expression_with_fraction_numerator.numerators[1]}`;
                                } else if (expression_with_fraction_numerator.signs[0] === '-' && expression_with_fraction_numerator.signs[1] === '+') {
                                    full_Expression_numerator_dop = `(${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]})+(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})`;
                                    full_Expression_numerator_final = `(${final_simplified_Root2_in_numerator})^${expression_with_fraction_numerator.numerators[1]}-(${final_simplified_Root1_in_numerator})^${expression_with_fraction_numerator.numerators[0]}`;
                                } else {
                                    html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                    return html;
                                }
                            } else {
                                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                return html;
                            }

                        } else if (expression_with_fraction_numerator.denominators[0] === '3' && expression_with_fraction_numerator.denominators[1] === '3') {
                            html += `<div>Степени корней в числителе равны трём, следовательно необходимо применить такие формулы сокращённого умножения, как разность или сумма кубов (в зависимости от знака между корнями): a<sup>3</sup>-b<sup>3</sup>=(a-b)(a<sup>2</sup>+a*b+b<sup>2</sup>) или a<sup>3</sup>+b<sup>3</sup>=(a+b)(a<sup>2</sup>-a*b+b<sup>2</sup>) соотственно.</div>`;
                            if (expression_with_fraction_numerator.signs[0] === '-' && expression_with_fraction_numerator.signs[1] === '+') {
                                full_Expression_numerator_dop = `((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^2+((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))*((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))+((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2`;
                                full_Expression_numerator_final = `(${final_simplified_Root2_in_numerator})^${expression_with_fraction_numerator.numerators[1]}-(${final_simplified_Root1_in_numerator})^${expression_with_fraction_numerator.numerators[0]}`;
                            } else if (expression_with_fraction_numerator.signs[0] === '+' && expression_with_fraction_numerator.signs[1] === '-') {
                                full_Expression_numerator_dop = `((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2+((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))*((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))+((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^2`;
                                full_Expression_numerator_final = `(${final_simplified_Root1_in_numerator})^${expression_with_fraction_numerator.numerators[0]}-(${final_simplified_Root2_in_numerator})^${expression_with_fraction_numerator.numerators[1]}`;
                            } else if (expression_with_fraction_numerator.signs[0] === '-' && expression_with_fraction_numerator.signs[1] === '-') {
                                full_Expression_numerator_dop = `((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2-((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))*((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))+((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^2`;
                                full_Expression_numerator_final = `-((${final_simplified_Root1_in_numerator})^${expression_with_fraction_numerator.numerators[0]}+(${final_simplified_Root2_in_numerator})^${expression_with_fraction_numerator.numerators[1]})`;
                            } else if (expression_with_fraction_numerator.signs[0] === '+' && expression_with_fraction_numerator.signs[1] === '+') {
                                full_Expression_numerator_dop = `((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2-((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))*((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))+((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^2`;
                                full_Expression_numerator_final = `(${final_simplified_Root1_in_numerator})^${expression_with_fraction_numerator.numerators[0]}+(${final_simplified_Root2_in_numerator})^${expression_with_fraction_numerator.numerators[1]}`;
                            } else if (full_Expression_numerator === `${expression_with_fraction_numerator.signs[0]}(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})${expression_with_fraction_numerator.signs[0]}(${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]})`) {
                                if (expression_with_fraction_numerator.signs[0] === '+' && expression_with_fraction_numerator.signs[1] === '-') {
                                    full_Expression_numerator_dop = `((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2+((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))*((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))+((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^2`;
                                    full_Expression_numerator_final = `(${final_simplified_Root1_in_numerator})^${expression_with_fraction_numerator.numerators[0]}-(${final_simplified_Root2_in_numerator})^${expression_with_fraction_numerator.numerators[1]}`;
                                } else if (expression_with_fraction_numerator.signs[0] === '-' && expression_with_fraction_numerator.signs[1] === '+') {
                                    full_Expression_numerator_dop = `((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^2+((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))*((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))+((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2`;
                                    full_Expression_numerator_final = `(${final_simplified_Root2_in_numerator})^${expression_with_fraction_numerator.numerators[1]}-(${final_simplified_Root1_in_numerator})^${expression_with_fraction_numerator.numerators[0]}`;
                                } else {
                                    html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                    return html;
                                }
                            } else {
                                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                return html;
                            }
                        } else if (expression_with_fraction_numerator.denominators[0] === '4' && expression_with_fraction_numerator.denominators[1] === '4') {
                            html += `<div>Степени корней в числителе равны четырём, следовательно необходимо применить такую формулу сокращённого умножения, как: a<sup>4</sup>-b<sup>4</sup>=(a-b)(a<sup>3</sup>+a<sup>2</sup>*b+a*b<sup>2</sup>+b<sup>3</sup>).</div>`;
                            if (expression_with_fraction_numerator.signs[0] === '-' && expression_with_fraction_numerator.signs[1] === '+') {
                                full_Expression_numerator_dop = `((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^3+(((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^2)*((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))+((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))*(((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2)+((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^3`;
                                full_Expression_numerator_final = `(${final_simplified_Root2_in_numerator})^${expression_with_fraction_numerator.numerators[1]}-(${final_simplified_Root1_in_numerator})^${expression_with_fraction_numerator.numerators[0]}`;
                            } else if (expression_with_fraction_numerator.signs[0] === '+' && expression_with_fraction_numerator.signs[1] === '-') {
                                full_Expression_numerator_dop = `((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^3+(((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2)*((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))+((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))*(((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^2)+((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^3`;
                                full_Expression_numerator_final = `(${final_simplified_Root1_in_numerator})^${expression_with_fraction_numerator.numerators[0]}-(${final_simplified_Root2_in_numerator})^${expression_with_fraction_numerator.numerators[1]}`;
                            } else if (expression_with_fraction_numerator.signs[0] === '-' && expression_with_fraction_numerator.signs[1] === '-') {
                                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                return html;
                            } else if (expression_with_fraction_numerator.signs[0] === '+' && expression_with_fraction_numerator.signs[1] === '+') {
                                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                return html;
                            } else if (full_Expression_numerator === `${expression_with_fraction_numerator.signs[0]}(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})${expression_with_fraction_numerator.signs[0]}(${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]})`) {
                                if (expression_with_fraction_numerator.signs[0] === '+' && expression_with_fraction_numerator.signs[1] === '-') {
                                    full_Expression_numerator_dop = `((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^3+(((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2)*((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))+((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))*(((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^2)+((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^3`;
                                    full_Expression_numerator_final = `(${final_simplified_Root1_in_numerator})^${expression_with_fraction_numerator.numerators[0]}-(${final_simplified_Root2_in_numerator})^${expression_with_fraction_numerator.numerators[1]}`;
                                } else if (expression_with_fraction_numerator.signs[0] === '-' && expression_with_fraction_numerator.signs[1] === '+') {
                                    full_Expression_numerator_dop = `((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^3+(((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))^2)*((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))+((${final_simplified_Root2_in_numerator})^(${expression_with_fraction_numerator.numerators[1]}/${expression_with_fraction_numerator.denominators[1]}))*(((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2)+((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^3`;
                                    full_Expression_numerator_final = `(${final_simplified_Root2_in_numerator})^${expression_with_fraction_numerator.numerators[1]}-(${final_simplified_Root1_in_numerator})^${expression_with_fraction_numerator.numerators[0]}`;
                                } else {
                                    html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                    return html;
                                }
                            } else {
                                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                return html;
                            }
                        } else {
                            html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                            return html;
                        }
                    }
                } else if (expression_with_fraction_numerator.bases.length === 1) {
                    if (expression_with_fraction_numerator.numerators[0] === '1') {
                        if (full_Expression_numerator === `(${final_simplified2_in_numerator})${expression_with_fraction_numerator.signs[0]}(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})`) {
                            if (expression_with_fraction_numerator.signs[0] === '+') {
                                if (expression_with_fraction_numerator.denominators[0] === '2') {
                                    html += `<div>Степень корня в числителе равна двум, следовательно необходимо применить такую формулу сокращённого умножения, как разность квадратов: a<sup>2</sup>-b<sup>2</sup>=(a-b)(a+b).</div>`;
                                    full_Expression_numerator_dop = `(${final_simplified2_in_numerator})-(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})`;
                                    full_Expression_numerator_final = `(${final_simplified2_in_numerator})^2-(${final_simplified_Root1_in_numerator})`;
                                } else if (expression_with_fraction_numerator.denominators[0] === '3') {
                                    html += `<div>Степень корня в числителе равна трём, следовательно необходимо применить такие формулы сокращённого умножения, как разность или сумма кубов (в зависимости от знака между корнями): a<sup>3</sup>-b<sup>3</sup>=(a-b)(a<sup>2</sup>+a*b+b<sup>2</sup>) или a<sup>3</sup>+b<sup>3</sup>=(a+b)(a<sup>2</sup>-a*b+b<sup>2</sup>) соотственно.</div>`;
                                    full_Expression_numerator_dop = `(${final_simplified2_in_numerator})^2-(${final_simplified2_in_numerator})*((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))+((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2`;
                                    full_Expression_numerator_final = `(${final_simplified2_in_numerator})^3+(${final_simplified_Root1_in_numerator})`;
                                } else if (expression_with_fraction_numerator.denominators[0] === '4') {
                                    html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                    return html;
                                } else {
                                    html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                    return html;
                                }
                            } else if (expression_with_fraction_numerator.signs[0] === '-') {
                                if (expression_with_fraction_numerator.denominators[0] === '2') {
                                    html += `<div>Степень корня в числителе равна двум, следовательно необходимо применить такую формулу сокращённого умножения, как разность квадратов: a<sup>2</sup>-b<sup>2</sup>=(a-b)(a+b).</div>`;
                                    full_Expression_numerator_dop = `(${final_simplified2_in_numerator})+(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})`;
                                    full_Expression_numerator_final = `(${final_simplified2_in_numerator})^2-(${final_simplified_Root1_in_numerator})`;
                                } else if (expression_with_fraction_numerator.denominators[0] === '3') {
                                    html += `<div>Степень корня в числителе равна трём, следовательно необходимо применить такие формулы сокращённого умножения, как разность или сумма кубов (в зависимости от знака между корнями): a<sup>3</sup>-b<sup>3</sup>=(a-b)(a<sup>2</sup>+a*b+b<sup>2</sup>) или a<sup>3</sup>+b<sup>3</sup>=(a+b)(a<sup>2</sup>-a*b+b<sup>2</sup>) соотственно.</div>`;
                                    full_Expression_numerator_dop = `(${final_simplified2_in_numerator})^2+(${final_simplified2_in_numerator})*((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))+((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2`;
                                    full_Expression_numerator_final = `(${final_simplified2_in_numerator})^3-(${final_simplified_Root1_in_numerator})`;
                                } else if (expression_with_fraction_numerator.denominators[0] === '4') {
                                    html += `<div>Степень корня в числителе равна четырём, следовательно необходимо применить такую формулу сокращённого умножения, как: a<sup>4</sup>-b<sup>4</sup>=(a-b)(a<sup>3</sup>+a<sup>2</sup>*b+a*b<sup>2</sup>+b<sup>3</sup>).</div>`;
                                    full_Expression_numerator_dop = `(${final_simplified2_in_numerator})^3+((${final_simplified2_in_numerator})^2)*((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))+(${final_simplified2_in_numerator})*(((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2)+((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^3`;
                                    full_Expression_numerator_final = `(${final_simplified2_in_numerator})^4-(${final_simplified_Root1_in_numerator})`;
                                } else {
                                    html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                    return html;
                                }
                            } else {
                                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                return html;
                            }
                        } else if (full_Expression_numerator === `${expression_with_fraction_numerator.signs[0]}(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})` || full_Expression_numerator === `(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})`) {
                            html += `<div>В данном случае сопряжённое выражение будет представлять из себя исходный корень.</div>`;
                            full_Expression_numerator_dop = `(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})`;
                            if (expression_with_fraction_numerator.signs[0] === '+') {
                                full_Expression_numerator_final = `(${final_simplified_Root1_in_numerator})`;
                            } else {
                                full_Expression_numerator_final = `${expression_with_fraction_numerator.signs[0]}(${final_simplified_Root1_in_numerator})`;
                            }
                        }
                        else {
                            html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                            return html;
                        }
                    } else {
                        if (full_Expression_numerator === `(${final_simplified2_in_numerator})${expression_with_fraction_numerator.signs[0]}(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})`) {
                            if (expression_with_fraction_numerator.signs[0] === '+') {
                                if (expression_with_fraction_numerator.denominators[0] === '2') {
                                    html += `<div>Степень корня в числителе равна двум, следовательно необходимо применить такую формулу сокращённого умножения, как разность квадратов: a<sup>2</sup>-b<sup>2</sup>=(a-b)(a+b).</div>`;
                                    full_Expression_numerator_dop = `(${final_simplified2_in_numerator})-(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})`;
                                    full_Expression_numerator_final = `(${final_simplified2_in_numerator})^2-(${final_simplified_Root1_in_numerator})^${expression_with_fraction_numerator.numerators[0]}`;
                                } else if (expression_with_fraction_numerator.denominators[0] === '3') {
                                    html += `<div>Степень корня в числителе равна трём, следовательно необходимо применить такие формулы сокращённого умножения, как разность или сумма кубов (в зависимости от знака между корнями): a<sup>3</sup>-b<sup>3</sup>=(a-b)(a<sup>2</sup>+a*b+b<sup>2</sup>) или a<sup>3</sup>+b<sup>3</sup>=(a+b)(a<sup>2</sup>-a*b+b<sup>2</sup>) соотственно.</div>`;
                                    full_Expression_numerator_dop = `(${final_simplified2_in_numerator})^2-(${final_simplified2_in_numerator})*((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))+((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2`;
                                    full_Expression_numerator_final = `(${final_simplified2_in_numerator})^3+(${final_simplified_Root1_in_numerator})^${expression_with_fraction_numerator.numerators[0]}`;
                                } else if (expression_with_fraction_numerator.denominators[0] === '4') {
                                    html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                    return html;
                                } else {
                                    html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                    return html;
                                }
                            } else if (expression_with_fraction_numerator.signs[0] === '-') {
                                if (expression_with_fraction_numerator.denominators[0] === '2') {
                                    html += `<div>Степень корня в числителе равна двум, следовательно необходимо применить такую формулу сокращённого умножения, как разность квадратов: a<sup>2</sup>-b<sup>2</sup>=(a-b)(a+b).</div>`;
                                    full_Expression_numerator_dop = `(${final_simplified2_in_numerator})+(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})`;
                                    full_Expression_numerator_final = `(${final_simplified2_in_numerator})^2-(${final_simplified_Root1_in_numerator})^${expression_with_fraction_numerator.numerators[0]}`;
                                } else if (expression_with_fraction_numerator.denominators[0] === '3') {
                                    html += `<div>Степень корня в числителе равна трём, следовательно необходимо применить такие формулы сокращённого умножения, как разность или сумма кубов (в зависимости от знака между корнями): a<sup>3</sup>-b<sup>3</sup>=(a-b)(a<sup>2</sup>+a*b+b<sup>2</sup>) или a<sup>3</sup>+b<sup>3</sup>=(a+b)(a<sup>2</sup>-a*b+b<sup>2</sup>) соотственно.</div>`;
                                    full_Expression_numerator_dop = `(${final_simplified2_in_numerator})^2+(${final_simplified2_in_numerator})*((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))+((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2`;
                                    full_Expression_numerator_final = `(${final_simplified2_in_numerator})^3-(${final_simplified_Root1_in_numerator})^${expression_with_fraction_numerator.numerators[0]}`;
                                } else if (expression_with_fraction_numerator.denominators[0] === '4') {
                                    html += `<div>Степень корня в числителе равна четырём, следовательно необходимо применить такую формулу сокращённого умножения, как: a<sup>4</sup>-b<sup>4</sup>=(a-b)(a<sup>3</sup>+a<sup>2</sup>*b+a*b<sup>2</sup>+b<sup>3</sup>).</div>`;
                                    full_Expression_numerator_dop = `(${final_simplified2_in_numerator})^3+((${final_simplified2_in_numerator})^2)*((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))+(${final_simplified2_in_numerator})*(((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^2)+((${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]}))^3`;
                                    full_Expression_numerator_final = `(${final_simplified2_in_numerator})^4-(${final_simplified_Root1_in_numerator})^${expression_with_fraction_numerator.numerators[0]}`;
                                } else {
                                    html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                    return html;
                                }
                            } else {
                                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                return html;
                            }
                        } else if (full_Expression_numerator === `${expression_with_fraction_numerator.signs[0]}(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})` || full_Expression_numerator === `(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})`) {
                            html += `<div>В данном случае сопряжённое выражение будет представлять из себя исходный корень.</div>`;
                            full_Expression_numerator_dop = `(${final_simplified_Root1_in_numerator})^(${expression_with_fraction_numerator.numerators[0]}/${expression_with_fraction_numerator.denominators[0]})`;
                            if (expression_with_fraction_numerator.signs[0] === '+') {
                                full_Expression_numerator_final = `(${final_simplified_Root1_in_numerator})^${expression_with_fraction_numerator.numerators[0]}`;
                            } else {
                                full_Expression_numerator_final = `${expression_with_fraction_numerator.signs[0]}(${final_simplified_Root1_in_numerator})^${expression_with_fraction_numerator.numerators[0]}`;
                            }
                        }
                        else {
                            html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                            return html;
                        }
                    }
                } else {
                    html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                    return html;
                }
                renderedStep = format_Formula_For_MathJax(full_Expression_numerator_dop);

                html += `<div>Таким образом, сопряжённое выражение для числителя будет иметь вид:</div>
                                <div class="mathjax-text">\\[${renderedStep}\\] </div>`;

                html += `<div>Т.к. в числителе добавилось сопряжённое выражение, необходимо как числитель умножить на сопряжённое выражение, так и знаменатель. Данный шаг делается для того, чтобы исходная дробь не потеряла своё значение и множители, что добавились как в числителе, так и в знаменателе, могли сократиться и представить из себя единицу. Числитель будет иметь вид:</div>`;
                num_vr1 = `(${full_Expression_numerator})`;
                general_vr2 = `(${full_Expression_numerator_dop})`;

                let renderedStep_vr_1_1 = format_Formula_For_MathJax(num_vr1);
                let renderedStep_vr_1_2 = format_Formula_For_MathJax(general_vr2);
                full_num_vr = `${renderedStep_vr_1_1}\\cdot${renderedStep_vr_1_2}`;

                den_vr1 = `(${full_Expression_denominator})`;

                let renderedStep_vr_2_1 = format_Formula_For_MathJax(den_vr1);
                full_den_vr = `${renderedStep_vr_2_1}\\cdot${renderedStep_vr_1_2}`;

                full_vr = `\\frac{${full_num_vr}}{${full_den_vr}}`;
                html += `<div class="mathjax-text">\\[${full_num_vr}\\] </div>
                <div>Обновлённая дробь:</div>
                <div class="mathjax-text">\\[${full_vr}\\] </div>`;

                let renderedStep_vr_3_1 = format_Formula_For_MathJax(full_Expression_numerator_final);

                html += `<div>Хоть сейчас дробь и выглядит пугающе, бояться не стоит. Теперь необходимо применить формулы сокращённого умножения. В числителе есть пара, которую можно объединить по формуле сокращённого умножения, упоминавшейся при объяснении поиска сопряжённого выражения:</div>
                <div class="mathjax-text">\\[${full_num_vr} = ${renderedStep_vr_3_1}\\]</div>
                <div>Тогда дробь примет вид:</div>`;
                full_num_vr = `\\left(${renderedStep_vr_3_1}\\right)`;
                full_vr = `\\frac{${full_num_vr}}{${full_den_vr}}`;
                html += `<div class="mathjax-text">\\[${full_vr}\\]</div>`;

                part_numerator = simplifyExpression_basic(full_Expression_numerator_final).factorizedExpr;
                renderedStep_vr_3_1 = format_Formula_For_MathJax(part_numerator);
                full_num_vr = `\\left(${renderedStep_vr_3_1}\\right)`;
                full_vr = `\\frac{${full_num_vr}}{${full_den_vr}}`;
                html += `<div>Также данную дробь можно записать в виде:</div>
                <div class="mathjax-text">\\[${full_vr}\\]</div>
                <div>Теперь можно приступить к упрощению дроби.</div>`;

                complete_non_simplified_expression = `(${part_numerator})/(${full_Expression_denominator}*(${full_Expression_numerator_dop}))`

            } else if (expression_with_fraction_denominator.has_Root) {
                //Знаменатель
                html += `<div>Как можем заметить, корни пристутствуют в знаменателе. Рассмотрим степень или степени корней в знаменателе (если это целесообразно) и выведем сопряжённое выражение.</div>`;

                if (expression_with_fraction_denominator.bases.length === 2) {
                    if (expression_with_fraction_denominator.numerators[0] === '1' && expression_with_fraction_denominator.numerators[1] === '1') {
                        if (expression_with_fraction_denominator.denominators[0] === '2' && expression_with_fraction_denominator.denominators[1] === '2') {
                            html += `<div>Степени корней в знаменателе равны двум, следовательно необходимо применить такую формулу сокращённого умножения, как разность квадратов: a<sup>2</sup>-b<sup>2</sup>=(a-b)(a+b).</div>`;
                            if (expression_with_fraction_denominator.signs[0] === '-' && expression_with_fraction_denominator.signs[1] === '+') {
                                full_Expression_denominator_dop = `(${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]})+(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})`;
                                full_Expression_denominator_final = `(${final_simplified_Root2_in_denominator})-(${final_simplified_Root1_in_denominator})`;
                            } else if (expression_with_fraction_denominator.signs[0] === '+' && expression_with_fraction_denominator.signs[1] === '-') {
                                full_Expression_denominator_dop = `(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})+(${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]})`;
                                full_Expression_denominator_final = `(${final_simplified_Root1_in_denominator})-(${final_simplified_Root2_in_denominator})`;
                            } else if (expression_with_fraction_denominator.signs[0] === '-' && expression_with_fraction_denominator.signs[1] === '-') {
                                full_Expression_denominator_dop = `(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})-(${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]})`;
                                full_Expression_denominator_final = `-((${final_simplified_Root1_in_denominator})-(${final_simplified_Root2_in_denominator}))`;
                            } else if (expression_with_fraction_denominator.signs[0] === '+' && expression_with_fraction_denominator.signs[1] === '+') {
                                full_Expression_denominator_dop = `(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})-(${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]})`;
                                full_Expression_denominator_final = `(${final_simplified_Root1_in_denominator})-(${final_simplified_Root2_in_denominator})`;
                            } else if (full_Expression_denominator === `${expression_with_fraction_denominator.signs[0]}(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})${expression_with_fraction_denominator.signs[0]}(${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]})`) {
                                if (expression_with_fraction_denominator.signs[0] === '+' && expression_with_fraction_denominator.signs[1] === '-') {
                                    full_Expression_denominator_dop = `(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})+(${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]})`;
                                    full_Expression_denominator_final = `(${final_simplified_Root1_in_denominator})-(${final_simplified_Root2_in_denominator})`;
                                } else if (expression_with_fraction_denominator.signs[0] === '-' && expression_with_fraction_denominator.signs[1] === '+') {
                                    full_Expression_denominator_dop = `(${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]})+(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})`;
                                    full_Expression_denominator_final = `(${final_simplified_Root2_in_denominator})-(${final_simplified_Root1_in_denominator})`;
                                } else {
                                    html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                    return html;
                                }
                            } else {
                                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                return html;
                            }

                        } else if (expression_with_fraction_denominator.denominators[0] === '3' && expression_with_fraction_denominator.denominators[1] === '3') {
                            html += `<div>Степени корней в знаменателе равны трём, следовательно необходимо применить такие формулы сокращённого умножения, как разность или сумма кубов (в зависимости от знака между корнями): a<sup>3</sup>-b<sup>3</sup>=(a-b)(a<sup>2</sup>+a*b+b<sup>2</sup>) или a<sup>3</sup>+b<sup>3</sup>=(a+b)(a<sup>2</sup>-a*b+b<sup>2</sup>) соотственно.</div>`;
                            if (expression_with_fraction_denominator.signs[0] === '-' && expression_with_fraction_denominator.signs[1] === '+') {
                                full_Expression_denominator_dop = `((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^2+((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))*((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))+((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2`;
                                full_Expression_denominator_final = `(${final_simplified_Root2_in_denominator})-(${final_simplified_Root1_in_denominator})`;
                            } else if (expression_with_fraction_denominator.signs[0] === '+' && expression_with_fraction_denominator.signs[1] === '-') {
                                full_Expression_denominator_dop = `((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2+((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))*((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))+((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^2`;
                                full_Expression_denominator_final = `(${final_simplified_Root1_in_denominator})-(${final_simplified_Root2_in_denominator})`;
                            } else if (expression_with_fraction_denominator.signs[0] === '-' && expression_with_fraction_denominator.signs[1] === '-') {
                                full_Expression_denominator_dop = `((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2-((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))*((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))+((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^2`;
                                full_Expression_denominator_final = `-((${final_simplified_Root1_in_denominator})+(${final_simplified_Root2_in_denominator}))`;
                            } else if (expression_with_fraction_denominator.signs[0] === '+' && expression_with_fraction_denominator.signs[1] === '+') {
                                full_Expression_denominator_dop = `((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2-((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))*((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))+((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^2`;
                                full_Expression_denominator_final = `(${final_simplified_Root1_in_denominator})+(${final_simplified_Root2_in_denominator})`;
                            } else if (full_Expression_denominator === `${expression_with_fraction_denominator.signs[0]}(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})${expression_with_fraction_denominator.signs[0]}(${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]})`) {
                                if (expression_with_fraction_denominator.signs[0] === '+' && expression_with_fraction_denominator.signs[1] === '-') {
                                    full_Expression_denominator_dop = `((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2+((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))*((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))+((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^2`;
                                    full_Expression_denominator_final = `(${final_simplified_Root1_in_denominator})-(${final_simplified_Root2_in_denominator})`;
                                } else if (expression_with_fraction_denominator.signs[0] === '-' && expression_with_fraction_denominator.signs[1] === '+') {
                                    full_Expression_denominator_dop = `((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^2+((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))*((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))+((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2`;
                                    full_Expression_denominator_final = `(${final_simplified_Root2_in_denominator})-(${final_simplified_Root1_in_denominator})`;
                                } else {
                                    html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                    return html;
                                }
                            } else {
                                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                return html;
                            }
                        } else if (expression_with_fraction_denominator.denominators[0] === '4' && expression_with_fraction_denominator.denominators[1] === '4') {
                            html += `<div>Степени корней в знаменателе равны четырём, следовательно необходимо применить такую формулу сокращённого умножения, как: a<sup>4</sup>-b<sup>4</sup>=(a-b)(a<sup>3</sup>+a<sup>2</sup>*b+a*b<sup>2</sup>+b<sup>3</sup>).</div>`;
                            if (expression_with_fraction_denominator.signs[0] === '-' && expression_with_fraction_denominator.signs[1] === '+') {
                                full_Expression_denominator_dop = `((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^3+(((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^2)*((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))+((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))*(((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2)+((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^3`;
                                full_Expression_denominator_final = `(${final_simplified_Root2_in_denominator})-(${final_simplified_Root1_in_denominator})`;
                            } else if (expression_with_fraction_denominator.signs[0] === '+' && expression_with_fraction_denominator.signs[1] === '-') {
                                full_Expression_denominator_dop = `((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^3+(((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2)*((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))+((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))*(((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^2)+((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^3`;
                                full_Expression_denominator_final = `(${final_simplified_Root1_in_denominator})-(${final_simplified_Root2_in_denominator})`;
                            } else if (expression_with_fraction_denominator.signs[0] === '-' && expression_with_fraction_denominator.signs[1] === '-') {
                                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                return html;
                            } else if (expression_with_fraction_denominator.signs[0] === '+' && expression_with_fraction_denominator.signs[1] === '+') {
                                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                return html;
                            } else if (full_Expression_denominator === `${expression_with_fraction_denominator.signs[0]}(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})${expression_with_fraction_denominator.signs[0]}(${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]})`) {
                                if (expression_with_fraction_denominator.signs[0] === '+' && expression_with_fraction_denominator.signs[1] === '-') {
                                    full_Expression_denominator_dop = `((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^3+(((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2)*((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))+((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))*(((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^2)+((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^3`;
                                    full_Expression_denominator_final = `(${final_simplified_Root1_in_denominator})-(${final_simplified_Root2_in_denominator})`;
                                } else if (expression_with_fraction_denominator.signs[0] === '-' && expression_with_fraction_denominator.signs[1] === '+') {
                                    full_Expression_denominator_dop = `((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^3+(((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^2)*((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))+((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))*(((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2)+((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^3`;
                                    full_Expression_denominator_final = `(${final_simplified_Root2_in_denominator})-(${final_simplified_Root1_in_denominator})`;
                                } else {
                                    html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                    return html;
                                }
                            } else {
                                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                return html;
                            }
                        } else {
                            html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                            return html;
                        }
                    } else if (expression_with_fraction_denominator.numerators[0] === '1') {
                        if (expression_with_fraction_denominator.denominators[0] === '2' && expression_with_fraction_denominator.denominators[1] === '2') {
                            html += `<div>Степени корней в знаменателе равны двум, следовательно необходимо применить такую формулу сокращённого умножения, как разность квадратов: a<sup>2</sup>-b<sup>2</sup>=(a-b)(a+b).</div>`;
                            if (expression_with_fraction_denominator.signs[0] === '-' && expression_with_fraction_denominator.signs[1] === '+') {
                                full_Expression_denominator_dop = `(${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]})+(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})`;
                                full_Expression_denominator_final = `(${final_simplified_Root2_in_denominator})^${expression_with_fraction_denominator.numerators[1]}-(${final_simplified_Root1_in_denominator})`;
                            } else if (expression_with_fraction_denominator.signs[0] === '+' && expression_with_fraction_denominator.signs[1] === '-') {
                                full_Expression_denominator_dop = `(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})+(${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]})`;
                                full_Expression_denominator_final = `(${final_simplified_Root1_in_denominator})-(${final_simplified_Root2_in_denominator})^${expression_with_fraction_denominator.numerators[1]}`;
                            } else if (expression_with_fraction_denominator.signs[0] === '-' && expression_with_fraction_denominator.signs[1] === '-') {
                                full_Expression_denominator_dop = `(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})-(${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]})`;
                                full_Expression_denominator_final = `-((${final_simplified_Root1_in_denominator})-(${final_simplified_Root2_in_denominator})^${expression_with_fraction_denominator.numerators[1]})`;
                            } else if (expression_with_fraction_denominator.signs[0] === '+' && expression_with_fraction_denominator.signs[1] === '+') {
                                full_Expression_denominator_dop = `(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})-(${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]})`;
                                full_Expression_denominator_final = `(${final_simplified_Root1_in_denominator})-(${final_simplified_Root2_in_denominator})^${expression_with_fraction_denominator.numerators[1]}`;
                            } else if (full_Expression_denominator === `${expression_with_fraction_denominator.signs[0]}(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})${expression_with_fraction_denominator.signs[0]}(${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]})`) {
                                if (expression_with_fraction_denominator.signs[0] === '+' && expression_with_fraction_denominator.signs[1] === '-') {
                                    full_Expression_denominator_dop = `(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})+(${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]})`;
                                    full_Expression_denominator_final = `(${final_simplified_Root1_in_denominator})-(${final_simplified_Root2_in_denominator})^${expression_with_fraction_denominator.numerators[1]}`;
                                } else if (expression_with_fraction_denominator.signs[0] === '-' && expression_with_fraction_denominator.signs[1] === '+') {
                                    full_Expression_denominator_dop = `(${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]})+(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})`;
                                    full_Expression_denominator_final = `(${final_simplified_Root2_in_denominator})^${expression_with_fraction_denominator.numerators[1]}-(${final_simplified_Root1_in_denominator})`;
                                } else {
                                    html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                    return html;
                                }
                            } else {
                                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                return html;
                            }

                        } else if (expression_with_fraction_denominator.denominators[0] === '3' && expression_with_fraction_denominator.denominators[1] === '3') {
                            html += `<div>Степени корней в знаменателе равны трём, следовательно необходимо применить такие формулы сокращённого умножения, как разность или сумма кубов (в зависимости от знака между корнями): a<sup>3</sup>-b<sup>3</sup>=(a-b)(a<sup>2</sup>+a*b+b<sup>2</sup>) или a<sup>3</sup>+b<sup>3</sup>=(a+b)(a<sup>2</sup>-a*b+b<sup>2</sup>) соотственно.</div>`;
                            if (expression_with_fraction_denominator.signs[0] === '-' && expression_with_fraction_denominator.signs[1] === '+') {
                                full_Expression_denominator_dop = `((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^2+((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))*((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))+((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2`;
                                full_Expression_denominator_final = `(${final_simplified_Root2_in_denominator})^${expression_with_fraction_denominator.numerators[1]}-(${final_simplified_Root1_in_denominator})`;
                            } else if (expression_with_fraction_denominator.signs[0] === '+' && expression_with_fraction_denominator.signs[1] === '-') {
                                full_Expression_denominator_dop = `((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2+((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))*((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))+((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^2`;
                                full_Expression_denominator_final = `(${final_simplified_Root1_in_denominator})-(${final_simplified_Root2_in_denominator})^${expression_with_fraction_denominator.numerators[1]}`;
                            } else if (expression_with_fraction_denominator.signs[0] === '-' && expression_with_fraction_denominator.signs[1] === '-') {
                                full_Expression_denominator_dop = `((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2-((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))*((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))+((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^2`;
                                full_Expression_denominator_final = `-((${final_simplified_Root1_in_denominator})+(${final_simplified_Root2_in_denominator})^${expression_with_fraction_denominator.numerators[1]})`;
                            } else if (expression_with_fraction_denominator.signs[0] === '+' && expression_with_fraction_denominator.signs[1] === '+') {
                                full_Expression_denominator_dop = `((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2-((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))*((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))+((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^2`;
                                full_Expression_denominator_final = `(${final_simplified_Root1_in_denominator})+(${final_simplified_Root2_in_denominator})^${expression_with_fraction_denominator.numerators[1]}`;
                            } else if (full_Expression_denominator === `${expression_with_fraction_denominator.signs[0]}(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})${expression_with_fraction_denominator.signs[0]}(${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]})`) {
                                if (expression_with_fraction_denominator.signs[0] === '+' && expression_with_fraction_denominator.signs[1] === '-') {
                                    full_Expression_denominator_dop = `((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2+((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))*((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))+((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^2`;
                                    full_Expression_denominator_final = `(${final_simplified_Root1_in_denominator})-(${final_simplified_Root2_in_denominator})^${expression_with_fraction_denominator.numerators[1]}`;
                                } else if (expression_with_fraction_denominator.signs[0] === '-' && expression_with_fraction_denominator.signs[1] === '+') {
                                    full_Expression_denominator_dop = `((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^2+((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))*((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))+((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2`;
                                    full_Expression_denominator_final = `(${final_simplified_Root2_in_denominator})^${expression_with_fraction_denominator.numerators[1]}-(${final_simplified_Root1_in_denominator})`;
                                } else {
                                    html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                    return html;
                                }
                            } else {
                                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                return html;
                            }
                        } else if (expression_with_fraction_denominator.denominators[0] === '4' && expression_with_fraction_denominator.denominators[1] === '4') {
                            html += `<div>Степени корней в знаменателе равны четырём, следовательно необходимо применить такую формулу сокращённого умножения, как: a<sup>4</sup>-b<sup>4</sup>=(a-b)(a<sup>3</sup>+a<sup>2</sup>*b+a*b<sup>2</sup>+b<sup>3</sup>).</div>`;
                            if (expression_with_fraction_denominator.signs[0] === '-' && expression_with_fraction_denominator.signs[1] === '+') {
                                full_Expression_denominator_dop = `((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^3+(((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^2)*((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))+((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))*(((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2)+((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^3`;
                                full_Expression_denominator_final = `(${final_simplified_Root2_in_denominator})^${expression_with_fraction_denominator.numerators[1]}-(${final_simplified_Root1_in_denominator})`;
                            } else if (expression_with_fraction_denominator.signs[0] === '+' && expression_with_fraction_denominator.signs[1] === '-') {
                                full_Expression_denominator_dop = `((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^3+(((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2)*((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))+((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))*(((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^2)+((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^3`;
                                full_Expression_denominator_final = `(${final_simplified_Root1_in_denominator})-(${final_simplified_Root2_in_denominator})^${expression_with_fraction_denominator.numerators[1]}`;
                            } else if (expression_with_fraction_denominator.signs[0] === '-' && expression_with_fraction_denominator.signs[1] === '-') {
                                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                return html;
                            } else if (expression_with_fraction_denominator.signs[0] === '+' && expression_with_fraction_denominator.signs[1] === '+') {
                                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                return html;
                            } else if (full_Expression_denominator === `${expression_with_fraction_denominator.signs[0]}(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})${expression_with_fraction_denominator.signs[0]}(${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]})`) {
                                if (expression_with_fraction_denominator.signs[0] === '+' && expression_with_fraction_denominator.signs[1] === '-') {
                                    full_Expression_denominator_dop = `((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^3+(((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2)*((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))+((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))*(((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^2)+((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^3`;
                                    full_Expression_denominator_final = `(${final_simplified_Root1_in_denominator})-(${final_simplified_Root2_in_denominator})^${expression_with_fraction_denominator.numerators[1]}`;
                                } else if (expression_with_fraction_denominator.signs[0] === '-' && expression_with_fraction_denominator.signs[1] === '+') {
                                    full_Expression_denominator_dop = `((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^3+(((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^2)*((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))+((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))*(((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2)+((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^3`;
                                    full_Expression_denominator_final = `(${final_simplified_Root2_in_denominator})^${expression_with_fraction_denominator.numerators[1]}-(${final_simplified_Root1_in_denominator})`;
                                } else {
                                    html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                    return html;
                                }
                            } else {
                                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                return html;
                            }
                        } else {
                            html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                            return html;
                        }
                    } else if (expression_with_fraction_denominator.numerators[1] === '1') {
                        if (expression_with_fraction_denominator.denominators[0] === '2' && expression_with_fraction_denominator.denominators[1] === '2') {
                            html += `<div>Степени корней в знаменателе равны двум, следовательно необходимо применить такую формулу сокращённого умножения, как разность квадратов: a<sup>2</sup>-b<sup>2</sup>=(a-b)(a+b).</div>`;
                            if (expression_with_fraction_denominator.signs[0] === '-' && expression_with_fraction_denominator.signs[1] === '+') {
                                full_Expression_denominator_dop = `(${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]})+(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})`;
                                full_Expression_denominator_final = `(${final_simplified_Root2_in_denominator})-(${final_simplified_Root1_in_denominator})^${expression_with_fraction_denominator.numerators[0]}`;
                            } else if (expression_with_fraction_denominator.signs[0] === '+' && expression_with_fraction_denominator.signs[1] === '-') {
                                full_Expression_denominator_dop = `(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})+(${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]})`;
                                full_Expression_denominator_final = `(${final_simplified_Root1_in_denominator})^${expression_with_fraction_denominator.numerators[0]}-(${final_simplified_Root2_in_denominator})`;
                            } else if (expression_with_fraction_denominator.signs[0] === '-' && expression_with_fraction_denominator.signs[1] === '-') {
                                full_Expression_denominator_dop = `(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})-(${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]})`;
                                full_Expression_denominator_final = `-((${final_simplified_Root1_in_denominator})^${expression_with_fraction_denominator.numerators[0]}-(${final_simplified_Root2_in_denominator})`;
                            } else if (expression_with_fraction_denominator.signs[0] === '+' && expression_with_fraction_denominator.signs[1] === '+') {
                                full_Expression_denominator_dop = `(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})-(${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]})`;
                                full_Expression_denominator_final = `(${final_simplified_Root1_in_denominator})^${expression_with_fraction_denominator.numerators[0]}-(${final_simplified_Root2_in_denominator})`;
                            } else if (full_Expression_denominator === `${expression_with_fraction_denominator.signs[0]}(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})${expression_with_fraction_denominator.signs[0]}(${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]})`) {
                                if (expression_with_fraction_denominator.signs[0] === '+' && expression_with_fraction_denominator.signs[1] === '-') {
                                    full_Expression_denominator_dop = `(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})+(${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]})`;
                                    full_Expression_denominator_final = `(${final_simplified_Root1_in_denominator})^${expression_with_fraction_denominator.numerators[0]}-(${final_simplified_Root2_in_denominator})`;
                                } else if (expression_with_fraction_denominator.signs[0] === '-' && expression_with_fraction_denominator.signs[1] === '+') {
                                    full_Expression_denominator_dop = `(${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]})+(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})`;
                                    full_Expression_denominator_final = `(${final_simplified_Root2_in_denominator})-(${final_simplified_Root1_in_denominator})^${expression_with_fraction_denominator.numerators[0]}`;
                                } else {
                                    html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                    return html;
                                }
                            } else {
                                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                return html;
                            }

                        } else if (expression_with_fraction_denominator.denominators[0] === '3' && expression_with_fraction_denominator.denominators[1] === '3') {
                            html += `<div>Степени корней в знаменателе равны трём, следовательно необходимо применить такие формулы сокращённого умножения, как разность или сумма кубов (в зависимости от знака между корнями): a<sup>3</sup>-b<sup>3</sup>=(a-b)(a<sup>2</sup>+a*b+b<sup>2</sup>) или a<sup>3</sup>+b<sup>3</sup>=(a+b)(a<sup>2</sup>-a*b+b<sup>2</sup>) соотственно.</div>`;
                            if (expression_with_fraction_denominator.signs[0] === '-' && expression_with_fraction_denominator.signs[1] === '+') {
                                full_Expression_denominator_dop = `((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^2+((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))*((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))+((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2`;
                                full_Expression_denominator_final = `(${final_simplified_Root2_in_denominator})-(${final_simplified_Root1_in_denominator})^${expression_with_fraction_denominator.numerators[0]}`;
                            } else if (expression_with_fraction_denominator.signs[0] === '+' && expression_with_fraction_denominator.signs[1] === '-') {
                                full_Expression_denominator_dop = `((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2+((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))*((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))+((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^2`;
                                full_Expression_denominator_final = `(${final_simplified_Root1_in_denominator})^${expression_with_fraction_denominator.numerators[0]}-(${final_simplified_Root2_in_denominator})`;
                            } else if (expression_with_fraction_denominator.signs[0] === '-' && expression_with_fraction_denominator.signs[1] === '-') {
                                full_Expression_denominator_dop = `((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2-((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))*((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))+((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^2`;
                                full_Expression_denominator_final = `-((${final_simplified_Root1_in_denominator})^${expression_with_fraction_denominator.numerators[0]}+(${final_simplified_Root2_in_denominator})`;
                            } else if (expression_with_fraction_denominator.signs[0] === '+' && expression_with_fraction_denominator.signs[1] === '+') {
                                full_Expression_denominator_dop = `((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2-((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))*((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))+((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^2`;
                                full_Expression_denominator_final = `(${final_simplified_Root1_in_denominator})^${expression_with_fraction_denominator.numerators[0]}+(${final_simplified_Root2_in_denominator})`;
                            } else if (full_Expression_denominator === `${expression_with_fraction_denominator.signs[0]}(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})${expression_with_fraction_denominator.signs[0]}(${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]})`) {
                                if (expression_with_fraction_denominator.signs[0] === '+' && expression_with_fraction_denominator.signs[1] === '-') {
                                    full_Expression_denominator_dop = `((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2+((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))*((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))+((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^2`;
                                    full_Expression_denominator_final = `(${final_simplified_Root1_in_denominator})^${expression_with_fraction_denominator.numerators[0]}-(${final_simplified_Root2_in_denominator})`;
                                } else if (expression_with_fraction_denominator.signs[0] === '-' && expression_with_fraction_denominator.signs[1] === '+') {
                                    full_Expression_denominator_dop = `((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^2+((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))*((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))+((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2`;
                                    full_Expression_denominator_final = `(${final_simplified_Root2_in_denominator})-(${final_simplified_Root1_in_denominator})^${expression_with_fraction_denominator.numerators[0]}`;
                                } else {
                                    html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                    return html;
                                }
                            } else {
                                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                return html;
                            }
                        } else if (expression_with_fraction_denominator.denominators[0] === '4' && expression_with_fraction_denominator.denominators[1] === '4') {
                            html += `<div>Степени корней в знаменателе равны четырём, следовательно необходимо применить такую формулу сокращённого умножения, как: a<sup>4</sup>-b<sup>4</sup>=(a-b)(a<sup>3</sup>+a<sup>2</sup>*b+a*b<sup>2</sup>+b<sup>3</sup>).</div>`;
                            if (expression_with_fraction_denominator.signs[0] === '-' && expression_with_fraction_denominator.signs[1] === '+') {
                                full_Expression_denominator_dop = `((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^3+(((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^2)*((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))+((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))*(((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2)+((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^3`;
                                full_Expression_denominator_final = `(${final_simplified_Root2_in_denominator})-(${final_simplified_Root1_in_denominator})^${expression_with_fraction_denominator.numerators[0]}`;
                            } else if (expression_with_fraction_denominator.signs[0] === '+' && expression_with_fraction_denominator.signs[1] === '-') {
                                full_Expression_denominator_dop = `((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^3+(((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2)*((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))+((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))*(((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^2)+((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^3`;
                                full_Expression_denominator_final = `(${final_simplified_Root1_in_denominator})^${expression_with_fraction_denominator.numerators[0]}-(${final_simplified_Root2_in_denominator})`;
                            } else if (expression_with_fraction_denominator.signs[0] === '-' && expression_with_fraction_denominator.signs[1] === '-') {
                                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                return html;
                            } else if (expression_with_fraction_denominator.signs[0] === '+' && expression_with_fraction_denominator.signs[1] === '+') {
                                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                return html;
                            } else if (full_Expression_denominator === `${expression_with_fraction_denominator.signs[0]}(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})${expression_with_fraction_denominator.signs[0]}(${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]})`) {
                                if (expression_with_fraction_denominator.signs[0] === '+' && expression_with_fraction_denominator.signs[1] === '-') {
                                    full_Expression_denominator_dop = `((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^3+(((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2)*((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))+((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))*(((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^2)+((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^3`;
                                    full_Expression_denominator_final = `(${final_simplified_Root1_in_denominator})^${expression_with_fraction_denominator.numerators[0]}-(${final_simplified_Root2_in_denominator})`;
                                } else if (expression_with_fraction_denominator.signs[0] === '-' && expression_with_fraction_denominator.signs[1] === '+') {
                                    full_Expression_denominator_dop = `((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^3+(((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^2)*((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))+((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))*(((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2)+((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^3`;
                                    full_Expression_denominator_final = `(${final_simplified_Root2_in_denominator})-(${final_simplified_Root1_in_denominator})^${expression_with_fraction_denominator.numerators[0]}`;
                                } else {
                                    html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                    return html;
                                }
                            } else {
                                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                return html;
                            }
                        } else {
                            html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                            return html;
                        }
                    } else {
                        if (expression_with_fraction_denominator.denominators[0] === '2' && expression_with_fraction_denominator.denominators[1] === '2') {
                            html += `<div>Степени корней в знаменателе равны двум, следовательно необходимо применить такую формулу сокращённого умножения, как разность квадратов: a<sup>2</sup>-b<sup>2</sup>=(a-b)(a+b).</div>`;
                            if (expression_with_fraction_denominator.signs[0] === '-' && expression_with_fraction_denominator.signs[1] === '+') {
                                full_Expression_denominator_dop = `(${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]})+(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})`;
                                full_Expression_denominator_final = `(${final_simplified_Root2_in_denominator})^${expression_with_fraction_denominator.numerators[1]}-(${final_simplified_Root1_in_denominator})^${expression_with_fraction_denominator.numerators[0]}`;
                            } else if (expression_with_fraction_denominator.signs[0] === '+' && expression_with_fraction_denominator.signs[1] === '-') {
                                full_Expression_denominator_dop = `(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})+(${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]})`;
                                full_Expression_denominator_final = `(${final_simplified_Root1_in_denominator})^${expression_with_fraction_denominator.numerators[0]}-(${final_simplified_Root2_in_denominator})^${expression_with_fraction_denominator.numerators[1]}`;
                            } else if (expression_with_fraction_denominator.signs[0] === '-' && expression_with_fraction_denominator.signs[1] === '-') {
                                full_Expression_denominator_dop = `(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})-(${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]})`;
                                full_Expression_denominator_final = `-((${final_simplified_Root1_in_denominator})^${expression_with_fraction_denominator.numerators[0]}-(${final_simplified_Root2_in_denominator})^${expression_with_fraction_denominator.numerators[1]})`;
                            } else if (expression_with_fraction_denominator.signs[0] === '+' && expression_with_fraction_denominator.signs[1] === '+') {
                                full_Expression_denominator_dop = `(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})-(${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]})`;
                                full_Expression_denominator_final = `(${final_simplified_Root1_in_denominator})^${expression_with_fraction_denominator.numerators[0]}-(${final_simplified_Root2_in_denominator})^${expression_with_fraction_denominator.numerators[1]}`;
                            } else if (full_Expression_denominator === `${expression_with_fraction_denominator.signs[0]}(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})${expression_with_fraction_denominator.signs[0]}(${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]})`) {
                                if (expression_with_fraction_denominator.signs[0] === '+' && expression_with_fraction_denominator.signs[1] === '-') {
                                    full_Expression_denominator_dop = `(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})+(${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]})`;
                                    full_Expression_denominator_final = `(${final_simplified_Root1_in_denominator})^${expression_with_fraction_denominator.numerators[0]}-(${final_simplified_Root2_in_denominator})^${expression_with_fraction_denominator.numerators[1]}`;
                                } else if (expression_with_fraction_denominator.signs[0] === '-' && expression_with_fraction_denominator.signs[1] === '+') {
                                    full_Expression_denominator_dop = `(${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]})+(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})`;
                                    full_Expression_denominator_final = `(${final_simplified_Root2_in_denominator})^${expression_with_fraction_denominator.numerators[1]}-(${final_simplified_Root1_in_denominator})^${expression_with_fraction_denominator.numerators[0]}`;
                                } else {
                                    html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                    return html;
                                }
                            } else {
                                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                return html;
                            }

                        } else if (expression_with_fraction_denominator.denominators[0] === '3' && expression_with_fraction_denominator.denominators[1] === '3') {
                            html += `<div>Степени корней в знаменателе равны трём, следовательно необходимо применить такие формулы сокращённого умножения, как разность или сумма кубов (в зависимости от знака между корнями): a<sup>3</sup>-b<sup>3</sup>=(a-b)(a<sup>2</sup>+a*b+b<sup>2</sup>) или a<sup>3</sup>+b<sup>3</sup>=(a+b)(a<sup>2</sup>-a*b+b<sup>2</sup>) соотственно.</div>`;
                            if (expression_with_fraction_denominator.signs[0] === '-' && expression_with_fraction_denominator.signs[1] === '+') {
                                full_Expression_denominator_dop = `((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^2+((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))*((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))+((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2`;
                                full_Expression_denominator_final = `(${final_simplified_Root2_in_denominator})^${expression_with_fraction_denominator.numerators[1]}-(${final_simplified_Root1_in_denominator})^${expression_with_fraction_denominator.numerators[0]}`;
                            } else if (expression_with_fraction_denominator.signs[0] === '+' && expression_with_fraction_denominator.signs[1] === '-') {
                                full_Expression_denominator_dop = `((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2+((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))*((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))+((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^2`;
                                full_Expression_denominator_final = `(${final_simplified_Root1_in_denominator})^${expression_with_fraction_denominator.numerators[0]}-(${final_simplified_Root2_in_denominator})^${expression_with_fraction_denominator.numerators[1]}`;
                            } else if (expression_with_fraction_denominator.signs[0] === '-' && expression_with_fraction_denominator.signs[1] === '-') {
                                full_Expression_denominator_dop = `((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2-((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))*((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))+((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^2`;
                                full_Expression_denominator_final = `-((${final_simplified_Root1_in_denominator})^${expression_with_fraction_denominator.numerators[0]}+(${final_simplified_Root2_in_denominator})^${expression_with_fraction_denominator.numerators[1]})`;
                            } else if (expression_with_fraction_denominator.signs[0] === '+' && expression_with_fraction_denominator.signs[1] === '+') {
                                full_Expression_denominator_dop = `((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2-((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))*((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))+((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^2`;
                                full_Expression_denominator_final = `(${final_simplified_Root1_in_denominator})^${expression_with_fraction_denominator.numerators[0]}+(${final_simplified_Root2_in_denominator})^${expression_with_fraction_denominator.numerators[1]}`;
                            } else if (full_Expression_denominator === `${expression_with_fraction_denominator.signs[0]}(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})${expression_with_fraction_denominator.signs[0]}(${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]})`) {
                                if (expression_with_fraction_denominator.signs[0] === '+' && expression_with_fraction_denominator.signs[1] === '-') {
                                    full_Expression_denominator_dop = `((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2+((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))*((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))+((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^2`;
                                    full_Expression_denominator_final = `(${final_simplified_Root1_in_denominator})^${expression_with_fraction_denominator.numerators[0]}-(${final_simplified_Root2_in_denominator})^${expression_with_fraction_denominator.numerators[1]}`;
                                } else if (expression_with_fraction_denominator.signs[0] === '-' && expression_with_fraction_denominator.signs[1] === '+') {
                                    full_Expression_denominator_dop = `((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^2+((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))*((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))+((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2`;
                                    full_Expression_denominator_final = `(${final_simplified_Root2_in_denominator})^${expression_with_fraction_denominator.numerators[1]}-(${final_simplified_Root1_in_denominator})^${expression_with_fraction_denominator.numerators[0]}`;
                                } else {
                                    html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                    return html;
                                }
                            } else {
                                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                return html;
                            }
                        } else if (expression_with_fraction_denominator.denominators[0] === '4' && expression_with_fraction_denominator.denominators[1] === '4') {
                            html += `<div>Степени корней в знаменателе равны четырём, следовательно необходимо применить такую формулу сокращённого умножения, как: a<sup>4</sup>-b<sup>4</sup>=(a-b)(a<sup>3</sup>+a<sup>2</sup>*b+a*b<sup>2</sup>+b<sup>3</sup>).</div>`;
                            if (expression_with_fraction_denominator.signs[0] === '-' && expression_with_fraction_denominator.signs[1] === '+') {
                                full_Expression_denominator_dop = `((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^3+(((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^2)*((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))+((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))*(((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2)+((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^3`;
                                full_Expression_denominator_final = `(${final_simplified_Root2_in_denominator})^${expression_with_fraction_denominator.numerators[1]}-(${final_simplified_Root1_in_denominator})^${expression_with_fraction_denominator.numerators[0]}`;
                            } else if (expression_with_fraction_denominator.signs[0] === '+' && expression_with_fraction_denominator.signs[1] === '-') {
                                full_Expression_denominator_dop = `((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^3+(((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2)*((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))+((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))*(((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^2)+((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^3`;
                                full_Expression_denominator_final = `(${final_simplified_Root1_in_denominator})^${expression_with_fraction_denominator.numerators[0]}-(${final_simplified_Root2_in_denominator})^${expression_with_fraction_denominator.numerators[1]}`;
                            } else if (expression_with_fraction_denominator.signs[0] === '-' && expression_with_fraction_denominator.signs[1] === '-') {
                                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                return html;
                            } else if (expression_with_fraction_denominator.signs[0] === '+' && expression_with_fraction_denominator.signs[1] === '+') {
                                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                return html;
                            } else if (full_Expression_denominator === `${expression_with_fraction_denominator.signs[0]}(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})${expression_with_fraction_denominator.signs[0]}(${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]})`) {
                                if (expression_with_fraction_denominator.signs[0] === '+' && expression_with_fraction_denominator.signs[1] === '-') {
                                    full_Expression_denominator_dop = `((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^3+(((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2)*((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))+((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))*(((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^2)+((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^3`;
                                    full_Expression_denominator_final = `(${final_simplified_Root1_in_denominator})^${expression_with_fraction_denominator.numerators[0]}-(${final_simplified_Root2_in_denominator})^${expression_with_fraction_denominator.numerators[1]}`;
                                } else if (expression_with_fraction_denominator.signs[0] === '-' && expression_with_fraction_denominator.signs[1] === '+') {
                                    full_Expression_denominator_dop = `((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^3+(((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))^2)*((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))+((${final_simplified_Root2_in_denominator})^(${expression_with_fraction_denominator.numerators[1]}/${expression_with_fraction_denominator.denominators[1]}))*(((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2)+((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^3`;
                                    full_Expression_denominator_final = `(${final_simplified_Root2_in_denominator})^${expression_with_fraction_denominator.numerators[1]}-(${final_simplified_Root1_in_denominator})^${expression_with_fraction_denominator.numerators[0]}`;
                                } else {
                                    html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                    return html;
                                }
                            } else {
                                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                return html;
                            }
                        } else {
                            html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                            return html;
                        }
                    }
                } else if (expression_with_fraction_denominator.bases.length === 1) {
                    if (expression_with_fraction_denominator.numerators[0] === '1') {
                        if (full_Expression_denominator === `(${final_simplified2_in_denominator})${expression_with_fraction_denominator.signs[0]}(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})`) {
                            if (expression_with_fraction_denominator.signs[0] === '+') {
                                if (expression_with_fraction_denominator.denominators[0] === '2') {
                                    html += `<div>Степень корня в знаменателе равна двум, следовательно необходимо применить такую формулу сокращённого умножения, как разность квадратов: a<sup>2</sup>-b<sup>2</sup>=(a-b)(a+b).</div>`;
                                    full_Expression_denominator_dop = `(${final_simplified2_in_denominator})-(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})`;
                                    full_Expression_denominator_final = `(${final_simplified2_in_denominator})^2-(${final_simplified_Root1_in_denominator})`;
                                } else if (expression_with_fraction_denominator.denominators[0] === '3') {
                                    html += `<div>Степень корня в знаменателе равна трём, следовательно необходимо применить такие формулы сокращённого умножения, как разность или сумма кубов (в зависимости от знака между корнями): a<sup>3</sup>-b<sup>3</sup>=(a-b)(a<sup>2</sup>+a*b+b<sup>2</sup>) или a<sup>3</sup>+b<sup>3</sup>=(a+b)(a<sup>2</sup>-a*b+b<sup>2</sup>) соотственно.</div>`;
                                    full_Expression_denominator_dop = `(${final_simplified2_in_denominator})^2-(${final_simplified2_in_denominator})*((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))+((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2`;
                                    full_Expression_denominator_final = `(${final_simplified2_in_denominator})^3+(${final_simplified_Root1_in_denominator})`;
                                } else if (expression_with_fraction_denominator.denominators[0] === '4') {
                                    html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                    return html;
                                } else {
                                    html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                    return html;
                                }
                            } else if (expression_with_fraction_denominator.signs[0] === '-') {
                                if (expression_with_fraction_denominator.denominators[0] === '2') {
                                    html += `<div>Степень корня в знаменателе равна двум, следовательно необходимо применить такую формулу сокращённого умножения, как разность квадратов: a<sup>2</sup>-b<sup>2</sup>=(a-b)(a+b).</div>`;
                                    full_Expression_denominator_dop = `(${final_simplified2_in_denominator})+(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})`;
                                    full_Expression_denominator_final = `(${final_simplified2_in_denominator})^2-(${final_simplified_Root1_in_denominator})`;
                                } else if (expression_with_fraction_denominator.denominators[0] === '3') {
                                    html += `<div>Степень корня в знаменателе равна трём, следовательно необходимо применить такие формулы сокращённого умножения, как разность или сумма кубов (в зависимости от знака между корнями): a<sup>3</sup>-b<sup>3</sup>=(a-b)(a<sup>2</sup>+a*b+b<sup>2</sup>) или a<sup>3</sup>+b<sup>3</sup>=(a+b)(a<sup>2</sup>-a*b+b<sup>2</sup>) соотственно.</div>`;
                                    full_Expression_denominator_dop = `(${final_simplified2_in_denominator})^2+(${final_simplified2_in_denominator})*((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))+((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2`;
                                    full_Expression_denominator_final = `(${final_simplified2_in_denominator})^3-(${final_simplified_Root1_in_denominator})`;
                                } else if (expression_with_fraction_denominator.denominators[0] === '4') {
                                    html += `<div>Степень корня в знаменателе равна четырём, следовательно необходимо применить такую формулу сокращённого умножения, как: a<sup>4</sup>-b<sup>4</sup>=(a-b)(a<sup>3</sup>+a<sup>2</sup>*b+a*b<sup>2</sup>+b<sup>3</sup>).</div>`;
                                    full_Expression_denominator_dop = `(${final_simplified2_in_denominator})^3+((${final_simplified2_in_denominator})^2)*((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))+(${final_simplified2_in_denominator})*(((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2)+((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^3`;
                                    full_Expression_denominator_final = `(${final_simplified2_in_denominator})^4-(${final_simplified_Root1_in_denominator})`;
                                } else {
                                    html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                    return html;
                                }
                            } else {
                                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                return html;
                            }
                        } else if (full_Expression_denominator === `${expression_with_fraction_denominator.signs[0]}(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})` || full_Expression_numerator === `(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})`) {
                            html += `<div>В данном случае сопряжённое выражение будет представлять из себя исходный корень.</div>`;
                            full_Expression_denominator_dop = `(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})`;
                            if (expression_with_fraction_denominator.signs[0] === '+') {
                                full_Expression_denominator_final = `(${final_simplified_Root1_in_denominator})`;
                            } else {
                                full_Expression_denominator_final = `${expression_with_fraction_denominator.signs[0]}(${final_simplified_Root1_in_denominator})`;
                            }
                        }
                        else {
                            html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                            return html;
                        }
                    } else {
                        if (full_Expression_denominator === `(${final_simplified2_in_denominator})${expression_with_fraction_denominator.signs[0]}(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})`) {
                            if (expression_with_fraction_denominator.signs[0] === '+') {
                                if (expression_with_fraction_denominator.denominators[0] === '2') {
                                    html += `<div>Степень корня в знаменателе равна двум, следовательно необходимо применить такую формулу сокращённого умножения, как разность квадратов: a<sup>2</sup>-b<sup>2</sup>=(a-b)(a+b).</div>`;
                                    full_Expression_denominator_dop = `(${final_simplified2_in_denominator})-(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})`;
                                    full_Expression_denominator_final = `(${final_simplified2_in_denominator})^2-(${final_simplified_Root1_in_denominator})^${expression_with_fraction_denominator.numerators[0]}`;
                                } else if (expression_with_fraction_denominator.denominators[0] === '3') {
                                    html += `<div>Степень корня в знаменателе равна трём, следовательно необходимо применить такие формулы сокращённого умножения, как разность или сумма кубов (в зависимости от знака между корнями): a<sup>3</sup>-b<sup>3</sup>=(a-b)(a<sup>2</sup>+a*b+b<sup>2</sup>) или a<sup>3</sup>+b<sup>3</sup>=(a+b)(a<sup>2</sup>-a*b+b<sup>2</sup>) соотственно.</div>`;
                                    full_Expression_denominator_dop = `(${final_simplified2_in_denominator})^2-(${final_simplified2_in_denominator})*((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))+((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2`;
                                    full_Expression_denominator_final = `(${final_simplified2_in_denominator})^3+(${final_simplified_Root1_in_denominator})^${expression_with_fraction_denominator.numerators[0]}`;
                                } else if (expression_with_fraction_denominator.denominators[0] === '4') {
                                    html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                    return html;
                                } else {
                                    html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                    return html;
                                }
                            } else if (expression_with_fraction_denominator.signs[0] === '-') {
                                if (expression_with_fraction_denominator.denominators[0] === '2') {
                                    html += `<div>Степень корня в знаменателе равна двум, следовательно необходимо применить такую формулу сокращённого умножения, как разность квадратов: a<sup>2</sup>-b<sup>2</sup>=(a-b)(a+b).</div>`;
                                    full_Expression_denominator_dop = `(${final_simplified2_in_denominator})+(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})`;
                                    full_Expression_denominator_final = `(${final_simplified2_in_denominator})^2-(${final_simplified_Root1_in_denominator})^${expression_with_fraction_denominator.numerators[0]}`;
                                } else if (expression_with_fraction_denominator.denominators[0] === '3') {
                                    html += `<div>Степень корня в знаменателе равна трём, следовательно необходимо применить такие формулы сокращённого умножения, как разность или сумма кубов (в зависимости от знака между корнями): a<sup>3</sup>-b<sup>3</sup>=(a-b)(a<sup>2</sup>+a*b+b<sup>2</sup>) или a<sup>3</sup>+b<sup>3</sup>=(a+b)(a<sup>2</sup>-a*b+b<sup>2</sup>) соотственно.</div>`;
                                    full_Expression_denominator_dop = `(${final_simplified2_in_denominator})^2+(${final_simplified2_in_denominator})*((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))+((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2`;
                                    full_Expression_denominator_final = `(${final_simplified2_in_denominator})^3-(${final_simplified_Root1_in_denominator})^${expression_with_fraction_denominator.numerators[0]}`;
                                } else if (expression_with_fraction_denominator.denominators[0] === '4') {
                                    html += `<div>Степень корня в знаменателе равна четырём, следовательно необходимо применить такую формулу сокращённого умножения, как: a<sup>4</sup>-b<sup>4</sup>=(a-b)(a<sup>3</sup>+a<sup>2</sup>*b+a*b<sup>2</sup>+b<sup>3</sup>).</div>`;
                                    full_Expression_denominator_dop = `(${final_simplified2_in_denominator})^3+((${final_simplified2_in_denominator})^2)*((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))+(${final_simplified2_in_denominator})*(((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^2)+((${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]}))^3`;
                                    full_Expression_denominator_final = `(${final_simplified2_in_denominator})^4-(${final_simplified_Root1_in_denominator})^${expression_with_fraction_denominator.numerators[0]}`;
                                } else {
                                    html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                    return html;
                                }
                            } else {
                                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                                return html;
                            }
                        } else if (full_Expression_denominator === `${expression_with_fraction_denominator.signs[0]}(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})` || full_Expression_numerator === `(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})`) {
                            html += `<div>В данном случае сопряжённое выражение будет представлять из себя исходный корень.</div>`;
                            full_Expression_denominator_dop = `(${final_simplified_Root1_in_denominator})^(${expression_with_fraction_denominator.numerators[0]}/${expression_with_fraction_denominator.denominators[0]})`;
                            if (expression_with_fraction_denominator.signs[0] === '+') {
                                full_Expression_denominator_final = `(${final_simplified_Root1_in_denominator})^${expression_with_fraction_denominator.numerators[0]}`;
                            } else {
                                full_Expression_denominator_final = `${expression_with_fraction_denominator.signs[0]}(${final_simplified_Root1_in_denominator})^${expression_with_fraction_denominator.numerators[0]}`;
                            }
                        }
                        else {
                            html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                            return html;
                        }
                    }
                } else {
                    html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                    return html;
                }
                renderedStep = format_Formula_For_MathJax(full_Expression_denominator_dop);

                html += `<div>Таким образом, сопряжённое выражение для знаменателя будет иметь вид:</div>
                                <div class="mathjax-text">\\[${renderedStep}\\] </div>`;

                html += `<div>Т.к. в знаменателе добавилось сопряжённое выражение, необходимо как знаменатель умножить на сопряжённое выражение, так и числитель. Данный шаг делается для того, чтобы исходная дробь не потеряла своё значение и множители, что добавились как в числителе, так и в знаменателе, могли сократиться и представить из себя единицу. Знаменатель будет иметь вид:</div>`;
                den_vr1 = `(${full_Expression_denominator})`;
                general_vr2 = `(${full_Expression_denominator_dop})`;

                let renderedStep_vr_1_1 = format_Formula_For_MathJax(den_vr1);
                let renderedStep_vr_1_2 = format_Formula_For_MathJax(general_vr2);
                full_den_vr = `${renderedStep_vr_1_1}\\cdot${renderedStep_vr_1_2}`;

                num_vr1 = `(${full_Expression_numerator})`;

                let renderedStep_vr_2_1 = format_Formula_For_MathJax(num_vr1);
                full_num_vr = `${renderedStep_vr_2_1}\\cdot${renderedStep_vr_1_2}`;

                full_vr = `\\frac{${full_num_vr}}{${full_den_vr}}`;
                html += `<div class="mathjax-text">\\[${full_den_vr}\\] </div>
                <div>Обновлённая дробь:</div>
                <div class="mathjax-text">\\[${full_vr}\\] </div>`;

                let renderedStep_vr_3_1 = format_Formula_For_MathJax(full_Expression_denominator_final);

                html += `<div>Хоть сейчас дробь и выглядит пугающе, бояться не стоит. Теперь необходимо применить формулы сокращённого умножения. В знаменателе есть пара, которую можно объединить по формуле сокращённого умножения, упоминавшейся при объяснении поиска сопряжённого выражения:</div>
                <div class="mathjax-text">\\[${full_den_vr} = ${renderedStep_vr_3_1}\\]</div>
                <div>Тогда дробь примет вид:</div>`;
                full_den_vr = `\\left(${renderedStep_vr_3_1}\\right)`;
                full_vr = `\\frac{${full_num_vr}}{${full_den_vr}}`;
                html += `<div class="mathjax-text">\\[${full_vr}\\]</div>`;

                part_denominator = simplifyExpression_basic(full_Expression_denominator_final).factorizedExpr;
                renderedStep_vr_3_1 = format_Formula_For_MathJax(part_denominator);
                full_den_vr = `\\left(${renderedStep_vr_3_1}\\right)`;
                full_vr = `\\frac{${full_num_vr}}{${full_den_vr}}`;
                html += `<div>Также данную дробь можно записать в виде:</div>
                <div class="mathjax-text">\\[${full_vr}\\]</div>
                <div>Теперь можно приступить к упрощению дроби.</div>`;

                complete_non_simplified_expression = `((${full_Expression_numerator})*(${full_Expression_denominator_dop}))/(${part_denominator})`
            } else {
                html += `<div>К сожалению, текущие вычислительные возможности ещё не позволяют решить данный предел.</div>`;
                return html;
            }
            console.log(complete_non_simplified_expression);
            simplificationSteps = simplifyExpression_basic(complete_non_simplified_expression);


            if (simplificationSteps.changing_exp_2) {
                html += `<div>Упрощение дроби целиком привело к данному результату:</div>`;
                simplified_formula = simplificationSteps.math_Simplified;
                numerator = format_Formula_For_MathJax(simplifyExpression_basic(simplified_formula).numerator);
                denominator = format_Formula_For_MathJax(simplifyExpression_basic(simplified_formula).denominator);
                renderedStep = `\\frac{${numerator}}{${denominator}}`;
                html += `<div class="mathjax-text">\\[ \\lim_{{x \\to ${value_x}}} ${renderedStep}\\] </div>`;
                simplificationSteps_intermediate = simplifyExpression_basic(simplified_formula);
               
                if (simplificationSteps_intermediate.checking_for_fractions) {
                    html += `<div>Проверим, удалось ли избавиться от неопределённости:</div>`;
                    //Вычисленные числитель и знаменатель
                    calculated_numerator = calculate_Limit(simplificationSteps_intermediate.numerator, value_x).decimal;
                    calculated_denominator = calculate_Limit(simplificationSteps_intermediate.denominator, value_x).decimal;
                    //Подставлено в числитель и знаменатель
                    substituted_into_numerator = substituteX(simplificationSteps_intermediate.numerator, value_x);
                    substituted_into_denominator = substituteX(simplificationSteps_intermediate.denominator, value_x);
                    //Обработанные числитель и знаменатель
                    render_numerator = format_Formula_For_MathJax(simplificationSteps_intermediate.numerator);
                    render_denominator = format_Formula_For_MathJax(simplificationSteps_intermediate.denominator);
                    //Обработанные подставленные в числитель и знаменатель
                    render_substituted_into_numerator = format_Formula_For_MathJax(substituted_into_numerator);
                    render_substituted_into_denominator = format_Formula_For_MathJax(substituted_into_denominator);
                    html += `<div class="mathjax-text">\\[
                        \\lim_{{x \\to ${value_x}}} ${formula} = \\lim_{{x \\to ${value_x}}} \\frac{${render_numerator}}{${render_denominator}} = 
                        \\lim_{{x \\to ${value_x}}} \\frac{${render_substituted_into_numerator}}{${render_substituted_into_denominator}} =
                        \\lim_{{x \\to ${value_x}}} \\frac{${calculated_numerator}}{${calculated_denominator}}\\]
                        </div>`;
                        
                    if ((calculated_numerator === '∞' && calculated_denominator === '∞') || (calculated_numerator === '0' && calculated_denominator === '0') || (calculated_numerator === '-∞' && calculated_denominator === '-∞')) {
                        html += `<div>Пока что избавиться от неопределённости не удалось. Попробуем применить другой способ, а именно разложение на множители, где какой-либо общий множиель выносится за скобку. Рассмотрим сначала числитель:<div>`;
                        decomposed_numerator = simplifyExpression_additionally(simplificationSteps_intermediate.factorizedNumeratorMsg);
                        decomposed_denominator = simplifyExpression_additionally(simplificationSteps_intermediate.factorizedDenominatorMsg);
                        let new_render_numerator = format_Formula_For_MathJax(decomposed_numerator.new_expression);
                        let new_render_denominator = format_Formula_For_MathJax(decomposed_denominator.new_expression);
                        let new_render_numerator_vrem = format_Formula_For_MathJax(decomposed_numerator.vrem);
                        let new_render_denominator_vrem = format_Formula_For_MathJax(decomposed_denominator.vrem);

                        example_changed = decomposed_numerator.expression_changed;
                        let Max_Pow = (decomposed_numerator.max_Power > decomposed_denominator.max_Power) ? decomposed_numerator.max_Power : decomposed_denominator.max_Power;

                        if (example_changed) {
                            html += `<div class="mathjax-text">\\[
                            ${render_numerator}=${new_render_numerator_vrem}=${new_render_numerator}\\]
                            </div>`;
                        }
                        else {
                            html += `<div>В данном числителе менять что-либо нецелесообразно.<div>`;
                        }

                        example_changed = decomposed_denominator.expression_changed;
                        html += `<div>Теперь рассмотрим знаменатель:<div>`;
                        if (example_changed) {
                            html += `<div class="mathjax-text">\\[
                            ${render_denominator}=${new_render_denominator_vrem}=${new_render_denominator}\\]
                            </div>`;
                        }
                        else {
                            html += `<div>В данном знаменателе менять что-либо нецелесообразно.<div>`;
                        }
                        html += `<div>Рассмотрим дробь целиком.<div>`;
                        let collected_fraction = `(${decomposed_numerator.new_expression})/(${decomposed_denominator.new_expression})`;
                        final_simplification = simplification_whole_fraction(collected_fraction, Max_Pow);

                        if (final_simplification.checking_for_number) {
                            html = `<div>При упрощении данной дроби можно сразу получить ответ:</div>`;
                            html += `<div class="mathjax-text">\\[
                            \\lim_{{x \\to ${limitTo}}} ${formula} = \\lim_{{x \\to ${limitTo}}} ${final_simplification.evaluatedString} \\]</div>
                            <div>Как извествено, предел const = const:</div>
                            <div class="mathjax-text">\\[
                            \\lim_{{\\begin{matrix} x \\to x_0 \\\\ x \\to {\\infty} \\end{matrix}}} C = C\\]
                            </div>
                            <div>Отсюда имеем:</div>
                            <div class="mathjax-text">\\[
                            \\lim_{{x \\to ${limitTo}}} ${final_simplification.evaluatedString} = ${final_simplification.evaluatedString}\\]
                            </div>`;
                            return html;
                        } else {
                            simplified_formula = final_simplification.simplifiedExpr;
                            result = calculate_Limit(simplified_formula, value_x);
                            let new_renderstep = nerdamer(final_simplification.simplifiedExpr);
                            new_renderstep = new_renderstep.toTeX();
                            html += `<div>Результат упрощения дроби:<div>
                                <div class="mathjax-text">\\[
                            \\lim_{{x \\to ${limitTo}}} ${renderedStep} = \\lim_{{x \\to ${limitTo}}} ${new_renderstep} \\]</div>`;
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
                    } else {
                        html += `<div><b>Избавиться от неопределённости удалось, поэтому можно приступить к вычислению предела.</b></div>`;
                        result = calculate_Limit(simplified_formula, value_x);
                        let intermediate_formula = substituteX(simplified_formula, value_x);
                        renderedStep = `\\frac{${render_substituted_into_numerator}}{${render_substituted_into_denominator}}`;
                        html += `
                            <div>После упрощения подставим значение \( x = ${value_x} \):</div>
                            <div class="mathjax-text">\\[
                            \\lim_{{x \\to ${value_x}}} ${renderedStep}=\\lim_{{x \\to ${value_x}}} ${result.decimal}\\]
                            </div>
                            <div>Как извествено, предел const = const:</div>
                            <div class="mathjax-text">\\[
                            \\lim_{{\\begin{matrix} x \\to x_0 \\\\ x \\to {\\infty} \\end{matrix}}} C = C\\]
                            </div>
                            <div>Отсюда имеем:</div>
                            <div class="mathjax-text">\\[
                            \\lim_{{x \\to ${value_x}}} ${result.decimal} = ${result.decimal}\\]
                            </div>
                            <div>Результат в виде обычной дроби: <span class="mathjax-text">\\[${result.fraction}\\]</span></div>
                            <div>Результат в виде десятичной дроби: <span class="mathjax-text">\\[${result.decimal}\\]</span></div>`;
                        return html;
                    }
                } else {
                    html += `<div>Приступим к вычислению предела.</div>`;
                    result = calculate_Limit(simplified_formula, value_x);
                    let intermediate_formula = substituteX(simplified_formula, value_x);
                    renderedStep = format_Formula_For_MathJax(intermediate_formula);
                    html += `
                            <div>После упрощения подставим значение \( x = ${value_x} \):</div>
                            <div class="mathjax-text">\\[
                            \\lim_{{x \\to ${value_x}}} ${renderedStep}=\\lim_{{x \\to ${value_x}}} ${result.decimal}\\]
                            </div>
                            <div>Как извествено, предел const = const:</div>
                            <div class="mathjax-text">\\[
                            \\lim_{{\\begin{matrix} x \\to x_0 \\\\ x \\to {\\infty} \\end{matrix}}} C = C\\]
                            </div>
                            <div>Отсюда имеем:</div>
                            <div class="mathjax-text">\\[
                            \\lim_{{x \\to ${value_x}}} ${result.decimal} = ${result.decimal}\\]
                            </div>
                            <div>Результат в виде обычной дроби: <span class="mathjax-text">\\[${result.fraction}\\]</span></div>
                            <div>Результат в виде десятичной дроби: <span class="mathjax-text">\\[${result.decimal}\\]</span></div>`;
                    return html;
                }
            } else {
                html += `<div>Упрощение дроби целиком не привело к изменениям</div>`;
                html += `<div>Пока что избавиться от неопределённости не удалось. Попробуем применить другой способ, а именно разложение на множители, где какой-либо общий множиель выносится за скобку. Рассмотрим сначала числитель:<div>`;
                decomposed_numerator = simplifyExpression_additionally(simplificationSteps_intermediate.factorizedNumeratorMsg);
                decomposed_denominator = simplifyExpression_additionally(simplificationSteps_intermediate.factorizedDenominatorMsg);
                let new_render_numerator = format_Formula_For_MathJax(decomposed_numerator.new_expression);
                let new_render_denominator = format_Formula_For_MathJax(decomposed_denominator.new_expression);
                let new_render_numerator_vrem = format_Formula_For_MathJax(decomposed_numerator.vrem);
                let new_render_denominator_vrem = format_Formula_For_MathJax(decomposed_denominator.vrem);

                example_changed = decomposed_numerator.expression_changed;
                let Max_Pow = (decomposed_numerator.max_Power > decomposed_denominator.max_Power) ? decomposed_numerator.max_Power : decomposed_denominator.max_Power;

                if (example_changed) {
                    html += `<div class="mathjax-text">\\[
                    ${render_numerator}=${new_render_numerator_vrem}=${new_render_numerator}\\]
                    </div>`;
                }
                else {
                    html += `<div>В данном числителе менять что-либо нецелесообразно.<div>`;
                }

                example_changed = decomposed_denominator.expression_changed;
                html += `<div>Теперь рассмотрим знаменатель:<div>`;
                if (example_changed) {
                    html += `<div class="mathjax-text">\\[
                    ${render_denominator}=${new_render_denominator_vrem}=${new_render_denominator}\\]
                    </div>`;
                }
                else {
                    html += `<div>В данном знаменателе менять что-либо нецелесообразно.<div>`;
                }
                html += `<div>Рассмотрим дробь целиком.<div>`;
                let collected_fraction = `(${decomposed_numerator.new_expression})/(${decomposed_denominator.new_expression})`;
                final_simplification = simplification_whole_fraction(collected_fraction, Max_Pow);

                if (final_simplification.checking_for_number) {
                    html = `<div>При упрощении данной дроби можно сразу получить ответ:</div>`;
                    html += `<div class="mathjax-text">\\[
                    \\lim_{{x \\to ${limitTo}}} ${formula} = \\lim_{{x \\to ${limitTo}}} ${final_simplification.evaluatedString} \\]</div>
                    <div>Как извествено, предел const = const:</div>
                    <div class="mathjax-text">\\[
                    \\lim_{{\\begin{matrix} x \\to x_0 \\\\ x \\to {\\infty} \\end{matrix}}} C = C\\]
                    </div>
                    <div>Отсюда имеем:</div>
                    <div class="mathjax-text">\\[
                    \\lim_{{x \\to ${limitTo}}} ${final_simplification.evaluatedString} = ${final_simplification.evaluatedString}\\]
                    </div>`;
                    return html;
                } else {
                    simplified_formula = final_simplification.simplifiedExpr;
                    result = calculate_Limit(simplified_formula, value_x);
                    let new_renderstep = nerdamer(final_simplification.simplifiedExpr);
                    new_renderstep = new_renderstep.toTeX();
                    html += `<div>Результат упрощения дроби:<div>
                        <div class="mathjax-text">\\[
                    \\lim_{{x \\to ${limitTo}}} ${renderedStep} = \\lim_{{x \\to ${limitTo}}} ${new_renderstep} \\]</div>`;
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
            }
        }
    }
    return html;
}

