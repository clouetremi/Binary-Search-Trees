class Node {
  constructor(key, left = null, right = null) {
    this.key = key;
    this.left = left;
    this.right = right;
  }
}


class Tree {
  constructor(arr) {
    this.root = this.buildTree(arr);
  }

  // le "?" (Optional Chaining Operator) sert à dire
  // si arr n'est pas null ou undefined alors prend arr.lengtgh
  // Sinon retoure undefined sans générer d'erreurs
  buildTree(arr, start = 0, end = arr?.length - 1) {
    if (start > end) return null;

    // Tri et suppression des doublons uniquement au premier appel
    if (start === 0 && end === arr.length - 1) {
      // Set stocke des valeurs uniques (enlève les doublons)
      // ... (spread operator) décompose un itérable (Set) en éléments individuels
      // Comme Set renvoie un objet et qu'on veut le convertir en tableau
      arr = [...new Set(arr)].sort((a, b) => a - b);
    }

    const mid = Math.floor((start + end) / 2);
    const root = new Node(arr[mid]);

    root.left = this.buildTree(arr, start, mid - 1);
    root.right = this.buildTree(arr, mid + 1, end);

    return root;
  }


  insert(value) {
    this.root = this._insertRec(this.root, value);
  }

  _insertRec(root, key) {
    if (root === null) {
      return new Node(key);
    }

    if (root.key === key) {
      return root; // pas de doublons
    }

    if (key < root.key) {
      root.left = this._insertRec(root.left, key);
    } else {
      root.right = this._insertRec(root.right, key)
    }

    return root;
  }

  // Traversée pour vérifier ton arbre
  inorder(root = this.root) {
    if (root !== null) {
      this.inorder(root.left);
      console.log(root.key);
      this.inorder(root.right);
    }
  }
};

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

// Exemple pour visualiser mon arbre; 
const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree(arr);

prettyPrint(tree.root); // Visualise ton arbre
