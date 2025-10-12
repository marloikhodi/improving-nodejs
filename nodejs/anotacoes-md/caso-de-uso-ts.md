# Exemplos de erros no TS

interface User {
birtYear: number
birtYear?: number -> caso não seja obrigatorio
}

function userCalcAge(user: User) {
return new Date().getFullYear() - user.birtYear
}

# console.log(userCalcAge('Marlo')) -> Error

console.log(userCalcAge({

# birtYear: 'Marlo' -> Error

birtYear: 1998
}))
