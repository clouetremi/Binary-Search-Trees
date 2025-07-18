const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }


}

class Tree {
  constructor(array) {
    const sortedUniqueArray = [...new Set(array)].sort((a, b) => (a - b));
    this.root = this.buildTree(sortedUniqueArray);
  }

  buildTree(array) {
    if (array.length === 0) return null;
    const mid = Math.floor(array.length / 2);
    const node = new Node(array[mid]);
    node.left = this.buildTree(array.slice(0, mid));
    node.right = this.buildTree(array.slice(mid + 1));
    return node;
  }

  insert(value) {
    this.root = this._insertRec(this.root, value)
  }

  _insertRec(root, data) {
    if (root === null)
      return new Node(data)

    if (root.data === data)
      return root;

    if (root.data > data) {
      root.left = this._insertRec(root.left, data)
    } else {
      root.right = this._insertRec(root.right, data)
    }

    return root;
  }

  inorderPrint(root = this.root) {
    if (root !== null) {
      this.inorderPrint(root.left);
      console.log(root.data)
      this.inorderPrint(root.right)
    }
  }

  getSuccessor(curr) {
    curr = curr.right;
    while (curr !== null && curr.left !== null) {
      curr = curr.left;
    }
    return curr;
  }

  deleteItem(value) {
    this.root = this._deleteItemRec(this.root, value);
  }

  _deleteItemRec(root, data) {
    // Base case
    if (root === null) {
      return root;
    }

    if (root.data > data) {
      root.left = this._deleteItemRec(root.left, data);
    } else if (root.data < data) {
      root.right = this._deleteItemRec(root.right, data);
    } else {
      // If root matches with the given data

      // Cases when root has 0 children or 
      // only right child
      if (root.left === null)
        return root.right;

      // Only left child
      if (root.right === null)
        return root.left;

      // When both children are present 
      let succ = this.getSuccessor(root);
      root.data = succ.data;
      root.right = this._deleteItemRec(root.right, succ.data)
    }
    return root;
  }

  find(value) {
    return this._findRec(this.root, value)
  }


  _findRec(node, value) {

    if (node === null)
      return null;

    if (value < node.data) {
      return this._findRec(node.left, value);
    } else if (value > node.data) {
      return this._findRec(node.right, value);
    } else {
      return node;
    }
  }

  levelOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("A callback function is required");
    }

    if (!this.root) {
      return;
    }

    const queue = [this.root];

    while (queue.length > 0) {
      const node = queue.shift(); // retire le premier élément de la queue
      callback(node);

      if (node.left) {
        queue.push(node.left)
      }
      if (node.right) {
        queue.push(node.right)
      }
    }
  }


  inOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("Callback is required");
    }

    function traverse(node) {
      if (node === null) return;
      traverse(node.left);
      callback(node);
      traverse(node.right);
    }

    traverse(this.root);
  }

  preOrderForEach(callback) {

    if (typeof callback !== "function") {
      throw new Error("Callback is required")
    }

    function traverse(node) {
      if (node === null) return;
      callback(node);
      traverse(node.left);
      traverse(node.right);
    }

    traverse(this.root);
  }

  postOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("Callback is required")
    }

    function traverse(node) {
      if (node === null) return;
      traverse(node.left);
      traverse(node.right);
      callback(node);
    }
    traverse(this.root)
  }

  height(value) {
    const node = this._findNode(this.root, value);
    if (node === null) return null;
    return this._getHeight(node)
  };

  _findNode(node, value) {
    if (node === null) return null;
    if (value < node.data) return this._findNode(node.left, value);
    else if (value > node.data) return this._findNode(node.right, value)
    else return node;
  }

  _getHeight(node) {
    if (node === null) return -1;
    const leftHeight = this._getHeight(node.left)
    const rightHeight = this._getHeight(node.right);
    return 1 + Math.max(leftHeight, rightHeight);
  }


  depth(value) {
    return this._depthRec(this.root, value, 0);
  }

  _depthRec(node, value, depthCount) {
    if (node === null) return null;

    if (value === node.data) {
      return depthCount;
    } else if (value < node.data) {
      return this._depthRec(node.left, value, depthCount + 1);
    } else {
      return this._depthRec(node.right, value, depthCount + 1)
    }
  }

  isBalanced() {
    return this._checkBalanced(this.root) !== -1;
  }

  _checkBalanced(node) {
    if (node === null) return 0;

    const leftHeight = this._checkBalanced(node.left);
    if (leftHeight === -1) return -1;

    const rightHeight = this._checkBalanced(node.right);
    if (rightHeight === -1) return -1;

    if (Math.abs(leftHeight - rightHeight) > 1) {
      return -1;
    }

    return 1 + Math.max(leftHeight, rightHeight);
  }

  // Parcours in-order pour obtenir un tableau trié
  inOrderArray(node = this.root, result = []) {
    if (node === null) return;
    this.inOrderArray(node.left, result);
    result.push(node.data)
    this.inOrderArray(node.right, result)
    return result;
  }

  rebalance() {
    const sortedArray = this.inOrderArray();
    this.root = this.buildTree(sortedArray);
  }

}

// Fonction qui génère un tableau de nombres aléatoires < 100
function generateRandomArray(size = 15, max = 100) {
  const arr = [];
  while (arr.length < size) {
    const randomNum = Math.floor(Math.random() * max);
    if (!arr.includes(randomNum)) {
      arr.push(randomNum);
    }
  }
  return arr;
}


// Création d'un arbre binaire à partir d'un tableau aléatoire
const randomArray = generateRandomArray();
console.log("Tableau initial (random < 100) :", randomArray)

const tree = new Tree(randomArray);

console.log("\nArbre construit :");
prettyPrint(tree.root);

// Vérification que l'arbre est équilibré 
console.log("\nL'arbre est-il équilibré ?", tree.isBalanced());

// Fonctions pour afficher les éléments dans différents parcours 
function printTraversal(tree) {
  console.log("\nParcours level-order :");
  tree.levelOrderForEach(node => console.log(node.data));

  console.log("\nParcours pré-ordre :");
  tree.preOrderForEach(node => console.log(node.data));

  console.log("\nParcours en ordre (in-order) :");
  tree.inOrderForEach(node => console.log(node.data));
}

// Affichage des parcours initiaux 
printTraversal(tree);

// Déséquilibrer l'arbre en insérant plusieurs nombres > 100
const unbalancingNumbers = [150, 200, 250, 300, 350];
console.log("\nInsertion des nombres pour déséquilibrer :", unbalancingNumbers);

unbalancingNumbers.forEach(num => tree.insert(num));

console.log("\nArbre après insertion (déséquilibré) :");
prettyPrint(tree.root);

// Vérification que l'arbre n'est plus équilibré 
console.log("\nL'arbre est-il équilibré après insertion ? ", tree.isBalanced());

// Rééquilibrage de l'arbre
tree.rebalance();

console.log("\nArbre après rééquilibrage :");
prettyPrint(tree.root);

// Vérification finale de l'équilibre
console.log("\nL'arbre est-il équilibré après rééquilibrage ? ", tree.isBalanced());

// Affichage des parcours finaux 
printTraversal(tree);



// Exemple pour visualiser mon arbre; 
const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree2 = new Tree(arr);

prettyPrint(tree2.root); // Visualise ton arbre