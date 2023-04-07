export class usuario_estudiante {
    constructor(name, carnet, password, raiz_archivo) {
        this.name = name;
        this.carnet = carnet;
        this.password = password;
        this.raiz_archivo = raiz_archivo;
        
    }
}
// ARBOL AVL
export class nodoE {
    constructor(valor, estudiante) {
        this.valor = valor;
        this.estudiante = estudiante;
        this.izquierda = null;
        this.derecha = null;
        this.altura = 1;
        this.factor_balance = 0;
    }
}

export class AVLTree {
    constructor() {
        this.raiz = null;
    }

    // this function will return the altura of the tree
    altura(raiz) {
        return raiz === null ? 0 : raiz.altura;
    }

    // this function will return the balance factor of the tree
    balanceFactor(raiz) {
        return raiz === null ? 0 : this.altura(raiz.derecha) - this.altura(raiz.izquierda);
    }

    // rotate to simple izquierda
    RotacionIzquierda(raiz) {
            let raiz_derecha = raiz.derecha;
            let raiz_hija_izquierda = raiz_derecha.izquierda;
            raiz_derecha.izquierda = raiz;
            raiz.derecha = raiz_hija_izquierda;
            // change the altura
            raiz.altura = 1 + Math.max(this.altura(raiz.izquierda), this.altura(raiz.derecha));
            raiz_derecha.altura =
                1 + Math.max(this.altura(raiz_derecha.izquierda), this.altura(raiz_derecha.derecha));
            // change the balance factor
            raiz.factor_balance = this.balanceFactor(raiz);
            // change the balance factor
            raiz_derecha.factor_balance = this.balanceFactor(raiz_derecha);
            // return the new raiz
            return raiz_derecha;
        }
        // rotate to simple derecha
    RotacionDerecha(raiz) {
        let raiz_izquierda = raiz.izquierda;
        let raiz_hija_derecha = raiz_izquierda.derecha;
        raiz_izquierda.derecha = raiz;
        raiz.izquierda = raiz_hija_derecha;
        // change the altura
        raiz.altura = 1 + Math.max(this.altura(raiz.izquierda), this.altura(raiz.derecha));
        raiz_izquierda.altura =
            1 + Math.max(this.altura(raiz_izquierda.izquierda), this.altura(raiz_izquierda.derecha));
        // change the balance factor
        raiz.factor_balance = this.balanceFactor(raiz);
        // change the balance factor
        raiz_izquierda.factor_balance = this.balanceFactor(raiz_izquierda);
        // return the new raiz
        return raiz_izquierda;
    }

    // priavet method to insert a valor
    insertarvalor(nodo, raiz) {
        if (raiz === null) {
            return nodo;
        } else {
            if (raiz.valor == nodo.valor) {
                raiz.valor = nodo.valor;
            } else if (nodo.valor < raiz.valor) {
                raiz.izquierda = this.insertarvalor(nodo, raiz.izquierda);
            } else {
                raiz.derecha = this.insertarvalor(nodo, raiz.derecha);
            }
        }
        // modified the altura of the tree
        raiz.altura = 1 + Math.max(this.altura(raiz.izquierda), this.altura(raiz.derecha));

        // balance
        let balance = this.balanceFactor(raiz);
        raiz.factor_balance = balance;

        // simple rotation to izquierda
        if (balance > 1 && nodo.valor > raiz.derecha.valor) {
            // call this function
            return this.RotacionIzquierda(raiz);
        }
        // simple rotation to derecha
        if (balance < -1 && nodo.valor < raiz.izquierda.valor) {
            // call this function
            return this.RotacionDerecha(raiz);
        }
        // double rotation to izquierda
        if (balance > 1 && nodo.valor < raiz.derecha.valor) {
            raiz.derecha = this.RotacionDerecha(raiz.derecha);
            return this.RotacionIzquierda(raiz);
        }
        // double rotation to derecha
        if (balance < -1 && nodo.valor > raiz.izquierda.valor) {
            raiz.izquierda = this.RotacionIzquierda(raiz.izquierda);
            return this.RotacionDerecha(raiz);
        }
        return raiz;
    }
    insertvalor(valor, estudiante) {
            const nuevonodo = new nodoE(valor, estudiante);
            this.raiz = this.insertarvalor(nuevonodo, this.raiz);
        }
        // search and return estudiante
    BuscarEstudiante(valor) {
        let actual = this.raiz;
        while (actual != null) {
            if (actual.valor == valor) {
                return actual.estudiante;
            } else if (valor < actual.valor) {
                actual = actual.izquierda;
            } else {
                actual = actual.derecha;
            }
        }
        return null;
    }


    //Borrar el Arbol 
    BorrarTodo() {
        this.raiz = null;
    }

    crearTextoParaGraphiz() {
            let texto = "digraph G {\n";

            texto += "  node [shape=circle, color=skyblue, fontcolor=white, style=filled];\n";
            texto += "  edge [arrowsize=1.0, color=green];\n";
            texto += "  graph [bgcolor=lightgrey];\n";
            function Agregarnodo(nodo) {
                if (nodo != null) {
                    let nodolabel = nodo.valor.toString();
                    let estudiante = nodo.estudiante;
                    texto += `  ${nodolabel} [label="${nodolabel} \\n ${estudiante.name} \\n Altura:${nodo.altura}"];\n`;
                    if (nodo.izquierda != null) {
                        texto += `  ${nodolabel} -> ${nodo.izquierda.valor};\n`;
                        Agregarnodo(nodo.izquierda);
                    }
                    if (nodo.derecha != null) {
                        texto += `  ${nodolabel} -> ${nodo.derecha.valor};\n`;
                        Agregarnodo(nodo.derecha);
                    }
                }
            }

            Agregarnodo(this.raiz);
            texto += "}";
            return texto;
        }
    inOrder(raiz) {
            let list = [];
            if (raiz != null) {
                list = list.concat(this.inOrder(raiz.izquierda));
                list.push(raiz);
                list = list.concat(this.inOrder(raiz.derecha));
            }
            return list;
        }
    preOrder(raiz) {
            let list = [];
            if (raiz != null) {
                list.push(raiz);
                list = list.concat(this.preOrder(raiz.izquierda));
                list = list.concat(this.preOrder(raiz.derecha));
            }
            return list;
        }
    postOrder(raiz) {
        let list = [];
        if (raiz != null) {
            list = list.concat(this.postOrder(raiz.izquierda));
            list = list.concat(this.postOrder(raiz.derecha));
            list.push(raiz);
        }
        return list;
    }
}