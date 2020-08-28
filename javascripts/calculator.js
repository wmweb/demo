(function(){
	var calculator = {
		expr:'0',
		onClickCalcOperator:true
	}
	let $numbers = document.querySelectorAll('.number');
	let $expr = document.querySelector('#expr');
	let $result = document.querySelector('#result');
	let $clear = document.querySelector('.clear');
	let $delete = document.querySelector('.delete');
	let $square = document.querySelector('.square');
	let $divide = document.querySelector('.divide');
	let $multiply = document.querySelector('.multiply');
	let $minus = document.querySelector('.minus');
	let $plus = document.querySelector('.plus');
	let $equal = document.querySelector('.equal');
	let $negative = document.querySelector('.negative');
	let $dot = document.querySelector('.dot');
	
	for(let $number of $numbers) {
		$number.addEventListener('click',function(event){
			var number = event.target.dataset.number;
			if (calculator.expr === '0') {
				calculator.expr = number;
			} else{
				calculator.expr += number
				calculator.onClickCalcOperator = true;
			}
			setResult(calculator.expr);
		})
	}
	
	function setResult(value){
		calculator.expr = String(value);
		$expr.innerText = value;
		setScale()
	}
	setResult(calculator.expr)
	
	function setScale() {
		let $resultWidth = document.querySelector('#result').clientWidth;
		let maxWidth = $resultWidth * (1 - 0.14);
		if($expr.scrollWidth > maxWidth) {
			$expr.style.transform = `scale(${maxWidth / $expr.scrollWidth})`;
			$expr.style.transformOrigin = 'right'
		}else{
			$expr.style.transform = `scale(1)`
		}
	}
	
	$clear.addEventListener('click',function() {
		calculator.expr = '0';
		setResult(calculator.expr)
	})
	$delete.addEventListener('click',function() {
		if (calculator.expr.length === 1) {
			calculator.expr = '0'
		} else{
			calculator.expr = calculator.expr.slice(0, calculator.expr.length-1);
		}
		setResult(calculator.expr)
	})
	$square.addEventListener('click',function() {
		calculator.expr = Math.pow(Number(calculator.expr), 2);
		setResult(calculator.expr)
	})
	$divide.addEventListener('click',function() {
		if (calculator.onClickCalcOperator) {
			setResult(calculator.expr + '/')
			calculator.onClickCalcOperator = false;
		} else{
			setResult(calculator.expr)
		}
	})
	$multiply.addEventListener('click',function() {
		if (calculator.onClickCalcOperator) {
			setResult(calculator.expr + '*')
			calculator.onClickCalcOperator = false;
		} else{
			setResult(calculator.expr)
		}
	})
	$minus.addEventListener('click',function() {
		if (calculator.onClickCalcOperator) {
			setResult(calculator.expr + '-')
			calculator.onClickCalcOperator = false;
		} else{
			setResult(calculator.expr)
		}
	})
	$plus.addEventListener('click',function() {
		if (calculator.onClickCalcOperator) {
			setResult(calculator.expr + '+')
			calculator.onClickCalcOperator = false;
		} else{
			setResult(calculator.expr)
		}
	})
	$equal.addEventListener('click',function() {
		setResult(eval(calculator.expr))
	})
	$dot.addEventListener('click',function() {
		setResult(calculator.expr + '.')
	})
	$negative.addEventListener('click',function() {
		calculator.expr = '';
		setResult('-' + calculator.expr)
	})
})()