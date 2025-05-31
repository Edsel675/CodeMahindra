export const infoPlatforms = [
    {
        "id": "arrays",
        "title": "Arrays & Hashing",
        "description": "Arrays and hashing are pillars of computer science. They allow you to store, search, and manipulate data efficiently. Mastering them is essential for solving data structure and algorithm problems.",
        "explanation": {
          "what_is_it": "An array is an ordered collection of elements of the same type. Hashing allows fast access to values using unique keys.",
          "why_is_it_important": "They help solve problems efficiently in terms of time and space. Hashing offers quick lookup (O(1) average), and arrays allow direct access and iteration.",
          "real_world_analogy": "An array is like a row of numbered seats—you can go straight to seat 5. A hashmap is like a dictionary—you search a word (key) and instantly get the definition (value)."
        },
        "implementations": [
          {
            "language": "Python",
            "snippet": "# Create an array\nnums = [1, 2, 3, 4, 5]\n\n# Count occurrences using a dictionary\nfrom collections import defaultdict\ncount = defaultdict(int)\nfor num in nums:\n    count[num] += 1"
          },
          {
            "language": "C++",
            "snippet": "#include <vector>\n#include <unordered_map>\nusing namespace std;\n\nvector<int> nums = {1, 2, 3, 4, 5};\nunordered_map<int, int> count;\nfor (int num : nums) {\n    count[num]++;\n}"
          }
        ],
        "leetcode_problems": [
          {
            "title": "Two Sum",
            "difficulty": "Easy",
            "url": "https://leetcode.com/problems/two-sum/"
          },
          {
            "title": "Contains Duplicate",
            "difficulty": "Easy",
            "url": "https://leetcode.com/problems/contains-duplicate/"
          },
          {
            "title": "Group Anagrams",
            "difficulty": "Medium",
            "url": "https://leetcode.com/problems/group-anagrams/"
          },
          {
            "title": "Top K Frequent Elements",
            "difficulty": "Medium",
            "url": "https://leetcode.com/problems/top-k-frequent-elements/"
          },
          {
            "title": "Longest Consecutive Sequence",
            "difficulty": "Hard",
            "url": "https://leetcode.com/problems/longest-consecutive-sequence/"
          }
        ],
        "videos": [
          {
            "title": "NeetCode: Arrays & Hashing",
            "url": "https://www.youtube.com/watch?v=bbQYW0s3xjE"
          },
          {
            "title": "Hash Maps Explained",
            "url": "https://www.youtube.com/watch?v=KyUTuwz_b7Q"
          },
          {
            "title": "Arrays in 5 Minutes",
            "url": "https://www.youtube.com/watch?v=lY6icfhap2o"
          }
        ],
        "resources": [
          {
            "title": "GeeksForGeeks: Arrays in C/C++",
            "url": "https://www.geeksforgeeks.org/arrays-in-c-cpp/"
          },
          {
            "title": "Python Sets and Dictionaries",
            "url": "https://docs.python.org/3/tutorial/datastructures.html#dictionaries"
          },
          {
            "title": "LeetCode Patterns – Arrays",
            "url": "https://seanprashad.com/leetcode-patterns/"
          }
        ],
        "tips": [
          "Use sets or hashmaps when checking for duplicates or pairs that sum up to a target.",
          "Use hashmaps to count the frequency of elements efficiently.",
          "Learn to use 'enumerate' in Python or 'unordered_map' in C++ to improve your solutions."
        ],
        "common_mistakes": [
          "Trying to modify an array while iterating over it without caution.",
          "Using nested loops when hashing could reduce complexity.",
          "Forgetting to handle duplicate keys in maps."
        ],
        "extra_examples": [
          {
            "title": "Find pairs that sum to 10",
            "language": "Python",
            "code": "nums = [2, 4, 6, 8, 10]\ntarget = 10\nseen = set()\nfor num in nums:\n    if target - num in seen:\n        print(f'Pair found: {num}, {target - num}')\n    seen.add(num)"
          },
          {
            "title": "Count word frequency",
            "language": "Python",
            "code": "from collections import Counter\nwords = ['apple', 'banana', 'apple', 'orange']\ncount = Counter(words)\nprint(count)"
          }
        ],
        "next_topic_suggestion": "twoPointers"
      },
      {
        "id": "twoPointers",
        "title": "Two Pointers",
        "description": "The Two Pointers technique involves using two indices to scan through a data structure from different ends or positions. It helps solve problems efficiently without nested loops.",
        "explanation": {
          "what_is_it": "Two pointers is a technique where two indices move through a list or array to solve problems like finding pairs, reversing, or scanning for patterns.",
          "why_is_it_important": "It reduces time complexity from O(n²) to O(n) in many scenarios such as finding pairs, removing duplicates, or manipulating subarrays.",
          "real_world_analogy": "Think of searching for a word in a book using both the front and back of the book simultaneously—meeting in the middle when found."
        },
        "implementations": [
          {
            "language": "Python",
            "snippet": "nums = [1, 2, 3, 4, 6]\ntarget = 7\nleft, right = 0, len(nums) - 1\nwhile left < right:\n    if nums[left] + nums[right] == target:\n        print(nums[left], nums[right])\n        break\n    elif nums[left] + nums[right] < target:\n        left += 1\n    else:\n        right -= 1"
          },
          {
            "language": "C++",
            "snippet": "#include <vector>\n#include <iostream>\nusing namespace std;\n\nvector<int> nums = {1, 2, 3, 4, 6};\nint target = 7;\nint left = 0, right = nums.size() - 1;\nwhile (left < right) {\n    int sum = nums[left] + nums[right];\n    if (sum == target) {\n        cout << nums[left] << ' ' << nums[right];\n        break;\n    } else if (sum < target) {\n        left++;\n    } else {\n        right--;\n    }\n}"
          }
        ],
        "leetcode_problems": [
          {
            "title": "Two Sum II - Input array is sorted",
            "difficulty": "Easy",
            "url": "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/"
          },
          {
            "title": "Valid Palindrome",
            "difficulty": "Easy",
            "url": "https://leetcode.com/problems/valid-palindrome/"
          },
          {
            "title": "Container With Most Water",
            "difficulty": "Medium",
            "url": "https://leetcode.com/problems/container-with-most-water/"
          },
          {
            "title": "Trapping Rain Water",
            "difficulty": "Hard",
            "url": "https://leetcode.com/problems/trapping-rain-water/"
          },
          {
            "title": "Remove Duplicates from Sorted Array",
            "difficulty": "Easy",
            "url": "https://leetcode.com/problems/remove-duplicates-from-sorted-array/"
          }
        ],
        "videos": [
          {
            "title": "NeetCode: Two Pointers Explained",
            "url": "https://www.youtube.com/watch?v=BoHO04xVeU0"
          },
          {
            "title": "Two Pointers Pattern - Coding Interview",
            "url": "https://www.youtube.com/watch?v=V75hgcsCGOM"
          }
        ],
        "resources": [
          {
            "title": "LeetCode Explore - Two Pointer Pattern",
            "url": "https://leetcode.com/explore/learn/card/fun-with-arrays/511/in-place-operations/3575/"
          },
          {
            "title": "GeeksForGeeks: Two Pointer Approach",
            "url": "https://www.geeksforgeeks.org/two-pointers-technique/"
          }
        ],
        "tips": [
          "Make sure the array is sorted if using two pointers from both ends.",
          "Use two pointers moving in the same direction when removing duplicates or comparing values.",
          "Avoid unnecessary comparisons—move the pointer based on the current condition."
        ],
        "common_mistakes": [
          "Forgetting to update both pointers properly, leading to infinite loops.",
          "Applying two pointers on unsorted arrays without understanding the impact.",
          "Using two pointers where a hashmap would be more efficient."
        ],
        "extra_examples": [
          {
            "title": "Reverse a string in place",
            "language": "Python",
            "code": "s = list(\"hello\")\nleft, right = 0, len(s) - 1\nwhile left < right:\n    s[left], s[right] = s[right], s[left]\n    left += 1\n    right -= 1\nprint(\"\".join(s))"
          },
          {
            "title": "Merge two sorted arrays",
            "language": "Python",
            "code": "nums1 = [1,2,3,0,0,0]\nnums2 = [2,5,6]\nm, n = 3, 3\nwhile m > 0 and n > 0:\n    if nums1[m-1] > nums2[n-1]:\n        nums1[m+n-1] = nums1[m-1]\n        m -= 1\n    else:\n        nums1[m+n-1] = nums2[n-1]\n        n -= 1\nnums1[:n] = nums2[:n]"
          }
        ],
        "next_topic_suggestion": "slidingWindow"
      },
      {
        "id": "stack",
        "title": "Stack",
        "description": "A stack is a Last-In-First-Out (LIFO) data structure. It allows adding and removing elements in a specific order, making it ideal for solving problems like reversing, parsing, and tracking state.",
        "explanation": {
          "what_is_it": "A stack is a data structure where the last element added is the first one to be removed. Think of it like a stack of plates.",
          "why_is_it_important": "Stacks are essential for many algorithmic problems involving backtracking, parsing expressions, depth-first search, and undo functionality.",
          "real_world_analogy": "Imagine stacking plates in the kitchen. You always remove the plate at the top first—the last one you placed."
        },
        "implementations": [
          {
            "language": "Python",
            "snippet": "# Creating and using a stack\nstack = []\nstack.append(10)\nstack.append(20)\nprint(stack.pop())  # Output: 20"
          },
          {
            "language": "C++",
            "snippet": "#include <stack>\n#include <iostream>\nusing namespace std;\n\nstack<int> s;\ns.push(10);\ns.push(20);\ncout << s.top() << endl;  // Output: 20\ns.pop();"
          }
        ],
        "leetcode_problems": [
          {
            "title": "Valid Parentheses",
            "difficulty": "Easy",
            "url": "https://leetcode.com/problems/valid-parentheses/"
          },
          {
            "title": "Min Stack",
            "difficulty": "Medium",
            "url": "https://leetcode.com/problems/min-stack/"
          },
          {
            "title": "Daily Temperatures",
            "difficulty": "Medium",
            "url": "https://leetcode.com/problems/daily-temperatures/"
          },
          {
            "title": "Evaluate Reverse Polish Notation",
            "difficulty": "Medium",
            "url": "https://leetcode.com/problems/evaluate-reverse-polish-notation/"
          },
          {
            "title": "Largest Rectangle in Histogram",
            "difficulty": "Hard",
            "url": "https://leetcode.com/problems/largest-rectangle-in-histogram/"
          }
        ],
        "videos": [
          {
            "title": "NeetCode: Stack Interview Problems",
            "url": "https://www.youtube.com/watch?v=wjI1WNcIntg"
          },
          {
            "title": "Stack Data Structure - CS50",
            "url": "https://www.youtube.com/watch?v=FxgM9k1oWcY"
          }
        ],
        "resources": [
          {
            "title": "GeeksForGeeks: Stack",
            "url": "https://www.geeksforgeeks.org/stack-data-structure/"
          },
          {
            "title": "Python Stack (list vs deque)",
            "url": "https://realpython.com/python-stacks-queues/"
          },
          {
            "title": "C++ Stack Reference",
            "url": "https://cplusplus.com/reference/stack/stack/"
          }
        ],
        "tips": [
          "Use stacks when you need to reverse an operation or maintain a history of actions.",
          "Stacks are often useful for depth-first search (DFS) in graphs and trees.",
          "Many parsing problems (like matching brackets) rely on stacks for correctness."
        ],
        "common_mistakes": [
          "Confusing LIFO (stack) with FIFO (queue).",
          "Forgetting to check if the stack is empty before popping.",
          "Using recursion without realizing you're mimicking a stack manually."
        ],
        "extra_examples": [
          {
            "title": "Check for balanced parentheses",
            "language": "Python",
            "code": "def is_balanced(s):\n    stack = []\n    mapping = {')': '(', '}': '{', ']': '['}\n    for char in s:\n        if char in mapping.values():\n            stack.append(char)\n        elif char in mapping:\n            if not stack or stack[-1] != mapping[char]:\n                return False\n            stack.pop()\n    return not stack"
          },
          {
            "title": "Implement a stack with getMin() in O(1)",
            "language": "Python",
            "code": "class MinStack:\n    def __init__(self):\n        self.stack = []\n        self.min_stack = []\n\n    def push(self, val):\n        self.stack.append(val)\n        val = min(val, self.min_stack[-1] if self.min_stack else val)\n        self.min_stack.append(val)\n\n    def pop(self):\n        self.stack.pop()\n        self.min_stack.pop()\n\n    def top(self):\n        return self.stack[-1]\n\n    def getMin(self):\n        return self.min_stack[-1]"
          }
        ],
        "next_topic_suggestion": "binarySearch"
      },
      {
        "id": "binarySearch",
        "title": "Binary Search",
        "description": "Binary Search is an efficient algorithm used to find elements in a sorted array or to solve optimization problems. It reduces the search space in half on each iteration, achieving logarithmic time complexity.",
        "explanation": {
          "what_is_it": "Binary Search is a divide-and-conquer algorithm that repeatedly divides a sorted array in half to locate a target value.",
          "why_is_it_important": "It drastically reduces time complexity from O(n) to O(log n) and is a foundation for solving advanced problems such as searching, decision-making, and numerical approximation.",
          "real_world_analogy": "Imagine looking for a word in a dictionary: you open the book near the middle and adjust your range depending on whether the word is earlier or later alphabetically."
        },
        "implementations": [
          {
            "language": "Python",
            "snippet": "def binary_search(arr, target):\n    left, right = 0, len(arr) - 1\n    while left <= right:\n        mid = (left + right) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            left = mid + 1\n        else:\n            right = mid - 1\n    return -1"
          },
          {
            "language": "C++",
            "snippet": "int binarySearch(vector<int>& arr, int target) {\n    int left = 0, right = arr.size() - 1;\n    while (left <= right) {\n        int mid = left + (right - left) / 2;\n        if (arr[mid] == target) return mid;\n        else if (arr[mid] < target) left = mid + 1;\n        else right = mid - 1;\n    }\n    return -1;\n}"
          }
        ],
        "leetcode_problems": [
          {
            "title": "Binary Search",
            "difficulty": "Easy",
            "url": "https://leetcode.com/problems/binary-search/"
          },
          {
            "title": "Search Insert Position",
            "difficulty": "Easy",
            "url": "https://leetcode.com/problems/search-insert-position/"
          },
          {
            "title": "Find Minimum in Rotated Sorted Array",
            "difficulty": "Medium",
            "url": "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/"
          },
          {
            "title": "Search in Rotated Sorted Array",
            "difficulty": "Medium",
            "url": "https://leetcode.com/problems/search-in-rotated-sorted-array/"
          },
          {
            "title": "Median of Two Sorted Arrays",
            "difficulty": "Hard",
            "url": "https://leetcode.com/problems/median-of-two-sorted-arrays/"
          }
        ],
        "videos": [
          {
            "title": "Binary Search Explained Visually - NeetCode",
            "url": "https://www.youtube.com/watch?v=GU7DpgHINWQ"
          },
          {
            "title": "Binary Search Template - Tech Dummies",
            "url": "https://www.youtube.com/watch?v=5cx0xerA8yY"
          }
        ],
        "resources": [
          {
            "title": "GeeksForGeeks: Binary Search",
            "url": "https://www.geeksforgeeks.org/binary-search/"
          },
          {
            "title": "Binary Search Templates & Patterns",
            "url": "https://leetcode.com/discuss/general-discussion/786126/python-powerful-ultimate-binary-search-template-solved-many-problems"
          },
          {
            "title": "Wikipedia - Binary Search Algorithm",
            "url": "https://en.wikipedia.org/wiki/Binary_search_algorithm"
          }
        ],
        "tips": [
          "Binary search only works on sorted data structures.",
          "Watch out for off-by-one errors and infinite loops caused by incorrect mid/left/right updates.",
          "Use binary search for numerical problems where you can define a boolean condition (e.g., 'can we do X in Y time?')."
        ],
        "common_mistakes": [
          "Forgetting to sort the input before applying binary search.",
          "Using incorrect loop conditions like `left < right` instead of `left <= right`.",
          "Using `(left + right) / 2` instead of `left + (right - left) // 2` to avoid overflow in some languages."
        ],
        "extra_examples": [
          {
            "title": "Find square root using binary search",
            "language": "Python",
            "code": "def sqrt(n):\n    left, right = 0, n\n    while left <= right:\n        mid = (left + right) // 2\n        if mid * mid == n:\n            return mid\n        elif mid * mid < n:\n            left = mid + 1\n        else:\n            right = mid - 1\n    return right"
          },
          {
            "title": "Find first occurrence of a number",
            "language": "Python",
            "code": "def first_occurrence(arr, target):\n    left, right, result = 0, len(arr)-1, -1\n    while left <= right:\n        mid = (left + right) // 2\n        if arr[mid] == target:\n            result = mid\n            right = mid - 1  # keep searching left side\n        elif arr[mid] < target:\n            left = mid + 1\n        else:\n            right = mid - 1\n    return result"
          }
        ],
        "next_topic_suggestion": "slidingWindow"
      },
      {
        "id": "slidingWindow",
        "title": "Sliding Window",
        "description": "The Sliding Window technique is used to solve problems involving subarrays or substrings in an efficient way. It's ideal for finding optimal intervals within arrays or strings.",
        "explanation": {
          "what_is_it": "Sliding Window is a technique where a subset of elements within an array is maintained and moved across the data to find the optimal solution without unnecessary recalculations.",
          "why_is_it_important": "It allows you to reduce time complexity from O(n²) to O(n) or O(n log n) in many problems involving sequences, making it a core technique for real-time and streaming algorithms.",
          "real_world_analogy": "Imagine a camera lens sliding across a filmstrip, capturing only a fixed-width portion at any time — that's your 'window' over the data."
        },
        "implementations": [
          {
            "language": "Python",
            "snippet": "# Find max sum of subarray of size k\ndef max_sum_subarray(nums, k):\n    window_sum = sum(nums[:k])\n    max_sum = window_sum\n    for i in range(k, len(nums)):\n        window_sum += nums[i] - nums[i - k]\n        max_sum = max(max_sum, window_sum)\n    return max_sum"
          },
          {
            "language": "C++",
            "snippet": "int maxSumSubarray(vector<int>& nums, int k) {\n    int window_sum = 0, max_sum = 0;\n    for (int i = 0; i < k; ++i)\n        window_sum += nums[i];\n    max_sum = window_sum;\n    for (int i = k; i < nums.size(); ++i) {\n        window_sum += nums[i] - nums[i - k];\n        max_sum = max(max_sum, window_sum);\n    }\n    return max_sum;\n}"
          }
        ],
        "leetcode_problems": [
          {
            "title": "Maximum Average Subarray I",
            "difficulty": "Easy",
            "url": "https://leetcode.com/problems/maximum-average-subarray-i/"
          },
          {
            "title": "Longest Substring Without Repeating Characters",
            "difficulty": "Medium",
            "url": "https://leetcode.com/problems/longest-substring-without-repeating-characters/"
          },
          {
            "title": "Minimum Size Subarray Sum",
            "difficulty": "Medium",
            "url": "https://leetcode.com/problems/minimum-size-subarray-sum/"
          },
          {
            "title": "Permutation in String",
            "difficulty": "Medium",
            "url": "https://leetcode.com/problems/permutation-in-string/"
          },
          {
            "title": "Sliding Window Maximum",
            "difficulty": "Hard",
            "url": "https://leetcode.com/problems/sliding-window-maximum/"
          }
        ],
        "videos": [
          {
            "title": "Sliding Window Explained - NeetCode",
            "url": "https://www.youtube.com/watch?v=8DEfhzHq5Io"
          },
          {
            "title": "Sliding Window Technique - Simplified",
            "url": "https://www.youtube.com/watch?v=MK-NZ4hN7Rs"
          }
        ],
        "resources": [
          {
            "title": "GeeksForGeeks: Sliding Window",
            "url": "https://www.geeksforgeeks.org/window-sliding-technique/"
          },
          {
            "title": "LeetCode Explore Card: Sliding Window",
            "url": "https://leetcode.com/explore/learn/card/queue-stack/239/conclusion/1391/"
          }
        ],
        "tips": [
          "Use fixed-size windows when you're asked to calculate something for all subarrays of size k.",
          "Use dynamic window size when you’re finding the smallest/longest substring that meets a condition.",
          "Maintain extra data structures (like a hash set or deque) to track elements inside the window."
        ],
        "common_mistakes": [
          "Forgetting to shrink the window properly when using variable-sized windows.",
          "Trying to recalculate the entire window sum instead of updating it incrementally.",
          "Using sliding window on unsorted data where order is crucial and not accounted for."
        ],
        "extra_examples": [
          {
            "title": "Find longest substring with all unique characters",
            "language": "Python",
            "code": "def longest_unique_substring(s):\n    seen = set()\n    left = max_len = 0\n    for right in range(len(s)):\n        while s[right] in seen:\n            seen.remove(s[left])\n            left += 1\n        seen.add(s[right])\n        max_len = max(max_len, right - left + 1)\n    return max_len"
          },
          {
            "title": "Find max in every window of size k (deque)",
            "language": "Python",
            "code": "from collections import deque\n\ndef maxSlidingWindow(nums, k):\n    q, res = deque(), []\n    for i, n in enumerate(nums):\n        while q and nums[q[-1]] < n:\n            q.pop()\n        q.append(i)\n        if q[0] == i - k:\n            q.popleft()\n        if i >= k - 1:\n            res.append(nums[q[0]])\n    return res"
          }
        ],
        "next_topic_suggestion": "linkedList"
      },
      {
        "id": "linkedList",
        "title": "Linked List",
        "description": "A linked list is a linear data structure where each element (node) contains a value and a pointer to the next node. It allows dynamic memory allocation and efficient insertions and deletions.",
        "explanation": {
          "what_is_it": "A linked list consists of nodes that are linked together via pointers. Each node contains a value and a reference to the next node in the sequence.",
          "why_is_it_important": "It’s more flexible than arrays when it comes to dynamic memory operations, as it doesn’t require contiguous memory. It’s widely used in stacks, queues, graphs, and memory management.",
          "real_world_analogy": "Think of a scavenger hunt where each clue points to the next location — each node in a linked list 'points' to the next item."
        },
        "implementations": [
          {
            "language": "Python",
            "snippet": "class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\n# Creating a list: 1 -> 2 -> 3\nhead = ListNode(1)\nhead.next = ListNode(2)\nhead.next.next = ListNode(3)"
          },
          {
            "language": "C++",
            "snippet": "struct ListNode {\n    int val;\n    ListNode* next;\n    ListNode(int x) : val(x), next(nullptr) {}\n};\n\n// Creating a list: 1 -> 2 -> 3\nListNode* head = new ListNode(1);\nhead->next = new ListNode(2);\nhead->next->next = new ListNode(3);"
          }
        ],
        "leetcode_problems": [
          {
            "title": "Reverse Linked List",
            "difficulty": "Easy",
            "url": "https://leetcode.com/problems/reverse-linked-list/"
          },
          {
            "title": "Merge Two Sorted Lists",
            "difficulty": "Easy",
            "url": "https://leetcode.com/problems/merge-two-sorted-lists/"
          },
          {
            "title": "Linked List Cycle",
            "difficulty": "Easy",
            "url": "https://leetcode.com/problems/linked-list-cycle/"
          },
          {
            "title": "Remove Nth Node From End of List",
            "difficulty": "Medium",
            "url": "https://leetcode.com/problems/remove-nth-node-from-end-of-list/"
          },
          {
            "title": "Copy List with Random Pointer",
            "difficulty": "Medium",
            "url": "https://leetcode.com/problems/copy-list-with-random-pointer/"
          }
        ],
        "videos": [
          {
            "title": "Linked List - Full Explanation | NeetCode",
            "url": "https://www.youtube.com/watch?v=Hj_rA0dhr2I"
          },
          {
            "title": "Reverse a Linked List - Recursive and Iterative",
            "url": "https://www.youtube.com/watch?v=O0By4Zq0OFc"
          }
        ],
        "resources": [
          {
            "title": "GeeksForGeeks: Linked List Basics",
            "url": "https://www.geeksforgeeks.org/data-structures/linked-list/"
          },
          {
            "title": "Linked List in Python - Real Python",
            "url": "https://realpython.com/linked-lists-python/"
          },
          {
            "title": "Linked List – Visualizer",
            "url": "https://visualgo.net/en/list"
          }
        ],
        "tips": [
          "Use a dummy node when modifying head or tail to simplify edge case handling.",
          "Practice both iterative and recursive solutions for reversing or traversing linked lists.",
          "Fast and slow pointers help detect cycles or find middle nodes efficiently."
        ],
        "common_mistakes": [
          "Not handling null pointers, especially when deleting or reversing lists.",
          "Forgetting to update all node pointers correctly during insertion or deletion.",
          "Confusing singly and doubly linked lists and their operations."
        ],
        "extra_examples": [
          {
            "title": "Iteratively reverse a linked list",
            "language": "Python",
            "code": "def reverse_list(head):\n    prev = None\n    while head:\n        next_node = head.next\n        head.next = prev\n        prev = head\n        head = next_node\n    return prev"
          },
          {
            "title": "Detect cycle in a linked list",
            "language": "Python",
            "code": "def hasCycle(head):\n    slow = fast = head\n    while fast and fast.next:\n        slow = slow.next\n        fast = fast.next.next\n        if slow == fast:\n            return True\n    return False"
          }
        ],
        "next_topic_suggestion": "trees"
      },
      {
        "id": "trees",
        "title": "Trees",
        "description": "A tree is a hierarchical data structure made up of nodes, where each node can have children. It's widely used in search, sorting, hierarchical modeling, and recursive algorithms.",
        "explanation": {
          "what_is_it": "A tree is a non-linear data structure consisting of nodes, with one node as the root and each node potentially having child nodes. A Binary Tree has at most two children per node.",
          "why_is_it_important": "Trees model hierarchical relationships and are used in file systems, databases, parsing, and AI. They're foundational for many algorithms, especially those involving recursion.",
          "real_world_analogy": "A family tree is a perfect analogy: each person (node) has parents and possibly children, forming a hierarchy."
        },
        "implementations": [
          {
            "language": "Python",
            "snippet": "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\n# Example: create tree with root 1, left 2, right 3\nroot = TreeNode(1)\nroot.left = TreeNode(2)\nroot.right = TreeNode(3)"
          },
          {
            "language": "C++",
            "snippet": "struct TreeNode {\n    int val;\n    TreeNode* left;\n    TreeNode* right;\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n};\n\n// Example: build simple tree\nTreeNode* root = new TreeNode(1);\nroot->left = new TreeNode(2);\nroot->right = new TreeNode(3);"
          }
        ],
        "leetcode_problems": [
          {
            "title": "Maximum Depth of Binary Tree",
            "difficulty": "Easy",
            "url": "https://leetcode.com/problems/maximum-depth-of-binary-tree/"
          },
          {
            "title": "Invert Binary Tree",
            "difficulty": "Easy",
            "url": "https://leetcode.com/problems/invert-binary-tree/"
          },
          {
            "title": "Same Tree",
            "difficulty": "Easy",
            "url": "https://leetcode.com/problems/same-tree/"
          },
          {
            "title": "Binary Tree Level Order Traversal",
            "difficulty": "Medium",
            "url": "https://leetcode.com/problems/binary-tree-level-order-traversal/"
          },
          {
            "title": "Serialize and Deserialize Binary Tree",
            "difficulty": "Hard",
            "url": "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/"
          }
        ],
        "videos": [
          {
            "title": "Binary Trees - NeetCode",
            "url": "https://www.youtube.com/watch?v=lfFqW1DTsqM"
          },
          {
            "title": "Tree Traversals (Inorder, Preorder, Postorder)",
            "url": "https://www.youtube.com/watch?v=gm8DUJJhmY4"
          }
        ],
        "resources": [
          {
            "title": "GeeksForGeeks: Tree Data Structures",
            "url": "https://www.geeksforgeeks.org/binary-tree-data-structure/"
          },
          {
            "title": "Binary Tree Visualizer",
            "url": "https://visualgo.net/en/bst"
          },
          {
            "title": "Binary Trees in Python - Real Python",
            "url": "https://realpython.com/binary-tree-traversal-python/"
          }
        ],
        "tips": [
          "Use recursion for elegant tree traversals.",
          "Remember the order: Inorder (Left, Root, Right), Preorder (Root, Left, Right), Postorder (Left, Right, Root).",
          "Practice both DFS and BFS approaches."
        ],
        "common_mistakes": [
          "Confusing left and right children when traversing or building trees.",
          "Forgetting base cases in recursive traversal functions.",
          "Not handling null pointers properly in edge cases."
        ],
        "extra_examples": [
          {
            "title": "Inorder traversal (recursive)",
            "language": "Python",
            "code": "def inorder_traversal(root):\n    if not root:\n        return []\n    return inorder_traversal(root.left) + [root.val] + inorder_traversal(root.right)"
          },
          {
            "title": "Level-order traversal (BFS)",
            "language": "Python",
            "code": "from collections import deque\n\ndef level_order(root):\n    if not root:\n        return []\n    result, queue = [], deque([root])\n    while queue:\n        level = []\n        for _ in range(len(queue)):\n            node = queue.popleft()\n            level.append(node.val)\n            if node.left:\n                queue.append(node.left)\n            if node.right:\n                queue.append(node.right)\n        result.append(level)\n    return result"
          }
        ],
        "next_topic_suggestion": "tries"
      },
      {
        "id": "tries",
        "title": "Tries",
        "description": "A trie (prefix tree) is a tree-based data structure used to store a dynamic set of strings. It's ideal for search engines, autocomplete systems, and prefix-based queries.",
        "explanation": {
          "what_is_it": "A trie is a specialized tree where each node represents a character in a word. Paths from the root to a node represent prefixes or full words.",
          "why_is_it_important": "Tries provide fast retrieval and are more space-efficient for storing dictionaries or searching common prefixes. Operations like insert, search, and delete run in O(L), where L is the word length.",
          "real_world_analogy": "Think of a phone book: once you dial the first few digits, you narrow down the possibilities. A trie does this with characters."
        },
        "implementations": [
          {
            "language": "Python",
            "snippet": "class TrieNode:\n    def __init__(self):\n        self.children = {}\n        self.end_of_word = False\n\nclass Trie:\n    def __init__(self):\n        self.root = TrieNode()\n\n    def insert(self, word):\n        node = self.root\n        for char in word:\n            if char not in node.children:\n                node.children[char] = TrieNode()\n            node = node.children[char]\n        node.end_of_word = True"
          },
          {
            "language": "C++",
            "snippet": "struct TrieNode {\n    TrieNode* children[26] = {};\n    bool isEnd = false;\n};\n\nclass Trie {\npublic:\n    TrieNode* root = new TrieNode();\n\n    void insert(string word) {\n        TrieNode* node = root;\n        for (char c : word) {\n            int i = c - 'a';\n            if (!node->children[i]) node->children[i] = new TrieNode();\n            node = node->children[i];\n        }\n        node->isEnd = true;\n    }\n};"
          }
        ],
        "leetcode_problems": [
          {
            "title": "Implement Trie (Prefix Tree)",
            "difficulty": "Medium",
            "url": "https://leetcode.com/problems/implement-trie-prefix-tree/"
          },
          {
            "title": "Replace Words",
            "difficulty": "Medium",
            "url": "https://leetcode.com/problems/replace-words/"
          },
          {
            "title": "Longest Word in Dictionary",
            "difficulty": "Medium",
            "url": "https://leetcode.com/problems/longest-word-in-dictionary/"
          },
          {
            "title": "Add and Search Word - Data structure design",
            "difficulty": "Medium",
            "url": "https://leetcode.com/problems/add-and-search-word-data-structure-design/"
          },
          {
            "title": "Word Search II",
            "difficulty": "Hard",
            "url": "https://leetcode.com/problems/word-search-ii/"
          }
        ],
        "videos": [
          {
            "title": "Trie Data Structure - NeetCode",
            "url": "https://www.youtube.com/watch?v=oO5uLE7EUlM"
          },
          {
            "title": "Understanding Tries - WilliamFiset",
            "url": "https://www.youtube.com/watch?v=zIjfhVPRZCg"
          }
        ],
        "resources": [
          {
            "title": "GeeksForGeeks: Trie Data Structure",
            "url": "https://www.geeksforgeeks.org/trie-insert-and-search/"
          },
          {
            "title": "VisualGo - Tries",
            "url": "https://visualgo.net/en/trie"
          },
          {
            "title": "Trie Implementation in Python",
            "url": "https://towardsdatascience.com/implementing-trie-data-structure-in-python-9b45e992e497"
          }
        ],
        "tips": [
          "Use tries when you deal with dictionaries, prefix searches, or autocomplete features.",
          "Each node should only store necessary children to save memory.",
          "Add a boolean flag to mark end-of-word nodes explicitly."
        ],
        "common_mistakes": [
          "Forgetting to mark the end of a word with a boolean.",
          "Not checking if a child exists before accessing it.",
          "Using full arrays instead of hashmaps/objects can waste space unnecessarily for sparse data."
        ],
        "extra_examples": [
          {
            "title": "Check if a word exists in a Trie",
            "language": "Python",
            "code": "def search(self, word):\n    node = self.root\n    for char in word:\n        if char not in node.children:\n            return False\n        node = node.children[char]\n    return node.end_of_word"
          },
          {
            "title": "Check if a prefix exists",
            "language": "Python",
            "code": "def starts_with(self, prefix):\n    node = self.root\n    for char in prefix:\n        if char not in node.children:\n            return False\n        node = node.children[char]\n    return True"
          }
        ],
        "next_topic_suggestion": "heap"
      },
      {
        "id": "heap",
        "title": "Heap / Priority Queue",
        "description": "A heap is a specialized tree-based data structure that satisfies the heap property: in a max heap, each parent is greater than its children; in a min heap, each parent is smaller. Priority queues are typically implemented using heaps.",
        "explanation": {
          "what_is_it": "A heap is a binary tree where each node maintains a specific order relative to its children (either min-heap or max-heap). A priority queue is an abstract data type that retrieves elements based on priority rather than insertion order.",
          "why_is_it_important": "Heaps provide efficient access to the smallest or largest element, making them ideal for scheduling, simulations, Dijkstra’s algorithm, median tracking, and more. Operations like insertion and extraction run in O(log n) time.",
          "real_world_analogy": "Imagine a hospital emergency room triage where patients with higher urgency are treated first. This system behaves like a priority queue — not first-come-first-served, but most urgent first."
        },
        "implementations": [
          {
            "language": "Python",
            "snippet": "import heapq\n\nmin_heap = []\nheapq.heappush(min_heap, 3)\nheapq.heappush(min_heap, 1)\nheapq.heappush(min_heap, 2)\n\nprint(heapq.heappop(min_heap))  # Output: 1"
          },
          {
            "language": "C++",
            "snippet": "#include <queue>\n#include <vector>\n\n// Max heap by default\npriority_queue<int> maxHeap;\n\n// Min heap\npriority_queue<int, vector<int>, greater<int>> minHeap;\n\nminHeap.push(3);\nminHeap.push(1);\nminHeap.push(2);\ncout << minHeap.top(); // Output: 1"
          }
        ],
        "leetcode_problems": [
          {
            "title": "Kth Largest Element in an Array",
            "difficulty": "Medium",
            "url": "https://leetcode.com/problems/kth-largest-element-in-an-array/"
          },
          {
            "title": "Top K Frequent Elements",
            "difficulty": "Medium",
            "url": "https://leetcode.com/problems/top-k-frequent-elements/"
          },
          {
            "title": "Merge K Sorted Lists",
            "difficulty": "Hard",
            "url": "https://leetcode.com/problems/merge-k-sorted-lists/"
          },
          {
            "title": "Find Median from Data Stream",
            "difficulty": "Hard",
            "url": "https://leetcode.com/problems/find-median-from-data-stream/"
          },
          {
            "title": "Reorganize String",
            "difficulty": "Medium",
            "url": "https://leetcode.com/problems/reorganize-string/"
          }
        ],
        "videos": [
          {
            "title": "Heap Explained - NeetCode",
            "url": "https://www.youtube.com/watch?v=7DmBoJ8Cz8I"
          },
          {
            "title": "Heaps & Priority Queues - WilliamFiset",
            "url": "https://www.youtube.com/watch?v=R_RKIKU-nfE"
          }
        ],
        "resources": [
          {
            "title": "GeeksForGeeks: Heap Data Structure",
            "url": "https://www.geeksforgeeks.org/heap-data-structure/"
          },
          {
            "title": "Python heapq Documentation",
            "url": "https://docs.python.org/3/library/heapq.html"
          },
          {
            "title": "Priority Queue in C++ STL",
            "url": "https://cplusplus.com/reference/queue/priority_queue/"
          }
        ],
        "tips": [
          "Min heaps are great for efficiently getting the smallest element. Use max heaps for the opposite.",
          "You can simulate a max heap in Python by storing negative values in a min heap.",
          "For k-largest or k-smallest problems, heaps are often more efficient than sorting."
        ],
        "common_mistakes": [
          "Confusing min-heap and max-heap behavior.",
          "Forgetting that heapq in Python only supports min-heap natively.",
          "Not maintaining heap invariants after direct list modifications."
        ],
        "extra_examples": [
          {
            "title": "Find K smallest elements",
            "language": "Python",
            "code": "import heapq\n\ndef k_smallest(nums, k):\n    return heapq.nsmallest(k, nums)"
          },
          {
            "title": "Simulate a max heap in Python",
            "language": "Python",
            "code": "import heapq\n\nnums = [1, 3, 5, 7]\nmax_heap = [-n for n in nums]\nheapq.heapify(max_heap)\nprint(-heapq.heappop(max_heap))  # Output: 7"
          }
        ],
        "next_topic_suggestion": "intervals"
      },
      {
        "id": "intervals",
        "title": "Intervals",
        "description": "Interval problems deal with ranges of values and often require merging, sorting, or comparing overlapping segments. These problems are common in scheduling, calendars, and timelines.",
        "explanation": {
          "what_is_it": "Intervals are pairs of values representing a start and end point, commonly written as [start, end]. They're used to define continuous ranges in arrays, time, or coordinates.",
          "why_is_it_important": "Interval-related problems appear frequently in real-world applications like booking systems, task scheduling, merging timelines, and detecting conflicts. Efficient handling of intervals can prevent costly operations.",
          "real_world_analogy": "Imagine booking meeting rooms: each reservation has a start and end time. You must make sure new reservations don’t overlap — this is an interval problem."
        },
        "implementations": [
          {
            "language": "Python",
            "snippet": "# Merge overlapping intervals\ndef merge(intervals):\n    intervals.sort(key=lambda x: x[0])\n    merged = []\n    for interval in intervals:\n        if not merged or merged[-1][1] < interval[0]:\n            merged.append(interval)\n        else:\n            merged[-1][1] = max(merged[-1][1], interval[1])\n    return merged"
          },
          {
            "language": "C++",
            "snippet": "#include <vector>\n#include <algorithm>\nusing namespace std;\n\nvector<vector<int>> merge(vector<vector<int>>& intervals) {\n    sort(intervals.begin(), intervals.end());\n    vector<vector<int>> merged;\n    for (auto& interval : intervals) {\n        if (merged.empty() || merged.back()[1] < interval[0])\n            merged.push_back(interval);\n        else\n            merged.back()[1] = max(merged.back()[1], interval[1]);\n    }\n    return merged;\n}"
          }
        ],
        "leetcode_problems": [
          {
            "title": "Merge Intervals",
            "difficulty": "Medium",
            "url": "https://leetcode.com/problems/merge-intervals/"
          },
          {
            "title": "Insert Interval",
            "difficulty": "Medium",
            "url": "https://leetcode.com/problems/insert-interval/"
          },
          {
            "title": "Meeting Rooms II",
            "difficulty": "Medium",
            "url": "https://leetcode.com/problems/meeting-rooms-ii/"
          },
          {
            "title": "Non-overlapping Intervals",
            "difficulty": "Medium",
            "url": "https://leetcode.com/problems/non-overlapping-intervals/"
          },
          {
            "title": "Employee Free Time",
            "difficulty": "Hard",
            "url": "https://leetcode.com/problems/employee-free-time/"
          }
        ],
        "videos": [
          {
            "title": "Merge Intervals - NeetCode",
            "url": "https://www.youtube.com/watch?v=44H3cEC2fFM"
          },
          {
            "title": "Interval Scheduling Explained",
            "url": "https://www.youtube.com/watch?v=qKczfGUrFY4"
          }
        ],
        "resources": [
          {
            "title": "GeeksForGeeks: Interval Problems",
            "url": "https://www.geeksforgeeks.org/interval-data-structure/"
          },
          {
            "title": "Interval Scheduling Visualization",
            "url": "https://visualgo.net/en/interval"
          }
        ],
        "tips": [
          "Always sort intervals by their start time before merging or comparing.",
          "Use a greedy approach to eliminate overlaps or maximize non-overlapping intervals.",
          "Track the end of the last added interval to know if the next one overlaps."
        ],
        "common_mistakes": [
          "Not sorting intervals before merging.",
          "Using incorrect conditions for detecting overlaps (check end < start, not equality).",
          "Overcomplicating — many problems are solvable with simple greedy logic."
        ],
        "extra_examples": [
          {
            "title": "Insert an interval into sorted list",
            "language": "Python",
            "code": "def insert(intervals, new_interval):\n    res = []\n    i = 0\n    while i < len(intervals) and intervals[i][1] < new_interval[0]:\n        res.append(intervals[i])\n        i += 1\n    while i < len(intervals) and intervals[i][0] <= new_interval[1]:\n        new_interval[0] = min(new_interval[0], intervals[i][0])\n        new_interval[1] = max(new_interval[1], intervals[i][1])\n        i += 1\n    res.append(new_interval)\n    res.extend(intervals[i:])\n    return res"
          },
          {
            "title": "Count non-overlapping intervals",
            "language": "Python",
            "code": "def eraseOverlapIntervals(intervals):\n    intervals.sort(key=lambda x: x[1])\n    end = float('-inf')\n    count = 0\n    for start, stop in intervals:\n        if start >= end:\n            end = stop\n        else:\n            count += 1\n    return count"
          }
        ],
        "next_topic_suggestion": "greedy"
      },
      {
        "id": "greedy",
        "title": "Greedy",
        "description": "Greedy algorithms make locally optimal choices at each step, hoping these decisions lead to a globally optimal solution. They're widely used in optimization problems.",
        "explanation": {
          "what_is_it": "Greedy algorithms make the best choice at each step based on a particular heuristic, without reconsidering previous decisions.",
          "why_is_it_important": "Many problems can be solved more efficiently using greedy strategies rather than brute force or dynamic programming. They're often simpler to implement and faster to execute.",
          "real_world_analogy": "Imagine trying to collect the most coins on a path — you always pick the largest visible pile without looking ahead. That’s greedy: it works great... until it doesn’t."
        },
        "implementations": [
          {
            "language": "Python",
            "snippet": "# Activity selection based on earliest end time\ndef max_activities(intervals):\n    intervals.sort(key=lambda x: x[1])\n    end = -1\n    count = 0\n    for start, finish in intervals:\n        if start >= end:\n            count += 1\n            end = finish\n    return count"
          },
          {
            "language": "C++",
            "snippet": "#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint maxActivities(vector<vector<int>>& intervals) {\n    sort(intervals.begin(), intervals.end(), [](auto& a, auto& b) {\n        return a[1] < b[1];\n    });\n    int end = -1, count = 0;\n    for (auto& i : intervals) {\n        if (i[0] >= end) {\n            count++;\n            end = i[1];\n        }\n    }\n    return count;\n}"
          }
        ],
        "leetcode_problems": [
          {
            "title": "Jump Game",
            "difficulty": "Medium",
            "url": "https://leetcode.com/problems/jump-game/"
          },
          {
            "title": "Gas Station",
            "difficulty": "Medium",
            "url": "https://leetcode.com/problems/gas-station/"
          },
          {
            "title": "Assign Cookies",
            "difficulty": "Easy",
            "url": "https://leetcode.com/problems/assign-cookies/"
          },
          {
            "title": "Non-overlapping Intervals",
            "difficulty": "Medium",
            "url": "https://leetcode.com/problems/non-overlapping-intervals/"
          },
          {
            "title": "Partition Labels",
            "difficulty": "Medium",
            "url": "https://leetcode.com/problems/partition-labels/"
          }
        ],
        "videos": [
          {
            "title": "Greedy Algorithms - NeetCode",
            "url": "https://www.youtube.com/watch?v=K0NgGYEAkA4"
          },
          {
            "title": "Greedy Algorithm Explained - CS Dojo",
            "url": "https://www.youtube.com/watch?v=ARf9TLQGmno"
          }
        ],
        "resources": [
          {
            "title": "GeeksForGeeks: Greedy Algorithms",
            "url": "https://www.geeksforgeeks.org/greedy-algorithms/"
          },
          {
            "title": "Greedy Techniques - TopCoder",
            "url": "https://www.topcoder.com/thrive/articles/Greedy%20Is%20Good"
          }
        ],
        "tips": [
          "Always sort the input based on a relevant key — such as earliest end time or smallest cost.",
          "Try to prove greedy correctness using the greedy choice property or exchange argument.",
          "If greedy fails on edge cases, consider switching to dynamic programming."
        ],
        "common_mistakes": [
          "Assuming greedy always works — it doesn't for every optimization problem.",
          "Choosing the wrong sorting criterion (e.g. start time instead of end time).",
          "Not verifying correctness with a counter-example."
        ],
        "extra_examples": [
          {
            "title": "Minimum number of platforms needed (Train scheduling)",
            "language": "Python",
            "code": "def min_platforms(arrivals, departures):\n    arrivals.sort()\n    departures.sort()\n    i = j = platforms = max_platforms = 0\n    while i < len(arrivals):\n        if arrivals[i] <= departures[j]:\n            platforms += 1\n            max_platforms = max(max_platforms, platforms)\n            i += 1\n        else:\n            platforms -= 1\n            j += 1\n    return max_platforms"
          },
          {
            "title": "Minimum number of arrows to burst balloons",
            "language": "Python",
            "code": "def findMinArrowShots(points):\n    points.sort(key=lambda x: x[1])\n    arrows = 1\n    end = points[0][1]\n    for start, finish in points[1:]:\n        if start > end:\n            arrows += 1\n            end = finish\n    return arrows"
          }
        ],
        "next_topic_suggestion": "backtracking"
      },
      {
        "id": "backtracking",
        "title": "Backtracking",
        "description": "Backtracking is a recursive algorithmic technique used to explore all possible solutions to a problem by trying one option at a time and undoing ('backtracking') when a decision path leads to a dead end.",
        "explanation": {
          "what_is_it": "Backtracking is a depth-first search technique that explores possible solution paths by building a solution incrementally and abandoning those that fail to satisfy the problem constraints.",
          "why_is_it_important": "It’s used in constraint satisfaction problems such as permutations, combinations, sudoku, n-queens, and decision trees where brute force is too expensive.",
          "real_world_analogy": "Think of a maze — you try a path, and if it leads to a wall, you go back and try a different one. That’s backtracking."
        },
        "implementations": [
          {
            "language": "Python",
            "snippet": "# Generate all permutations of a list\ndef permute(nums):\n    res = []\n    def backtrack(path, used):\n        if len(path) == len(nums):\n            res.append(path[:])\n            return\n        for i in range(len(nums)):\n            if used[i]: continue\n            used[i] = True\n            path.append(nums[i])\n            backtrack(path, used)\n            path.pop()\n            used[i] = False\n    backtrack([], [False]*len(nums))\n    return res"
          },
          {
            "language": "C++",
            "snippet": "#include <vector>\nusing namespace std;\n\nvoid backtrack(vector<int>& path, vector<bool>& used, vector<int>& nums, vector<vector<int>>& res) {\n    if (path.size() == nums.size()) {\n        res.push_back(path);\n        return;\n    }\n    for (int i = 0; i < nums.size(); ++i) {\n        if (used[i]) continue;\n        used[i] = true;\n        path.push_back(nums[i]);\n        backtrack(path, used, nums, res);\n        path.pop_back();\n        used[i] = false;\n    }\n}\n\nvector<vector<int>> permute(vector<int>& nums) {\n    vector<vector<int>> res;\n    vector<bool> used(nums.size(), false);\n    vector<int> path;\n    backtrack(path, used, nums, res);\n    return res;\n}"
          }
        ],
        "leetcode_problems": [
          {
            "title": "Permutations",
            "difficulty": "Medium",
            "url": "https://leetcode.com/problems/permutations/"
          },
          {
            "title": "Combination Sum",
            "difficulty": "Medium",
            "url": "https://leetcode.com/problems/combination-sum/"
          },
          {
            "title": "Letter Combinations of a Phone Number",
            "difficulty": "Medium",
            "url": "https://leetcode.com/problems/letter-combinations-of-a-phone-number/"
          },
          {
            "title": "N-Queens",
            "difficulty": "Hard",
            "url": "https://leetcode.com/problems/n-queens/"
          },
          {
            "title": "Word Search",
            "difficulty": "Medium",
            "url": "https://leetcode.com/problems/word-search/"
          }
        ],
        "videos": [
          {
            "title": "Backtracking Explained - NeetCode",
            "url": "https://www.youtube.com/watch?v=DKCbsiDBN6c"
          },
          {
            "title": "Backtracking Algorithms - Tech With Tim",
            "url": "https://www.youtube.com/watch?v=rdx2wYkHEGA"
          }
        ],
        "resources": [
          {
            "title": "GeeksForGeeks: Backtracking",
            "url": "https://www.geeksforgeeks.org/backtracking-algorithms/"
          },
          {
            "title": "Backtracking vs DFS",
            "url": "https://www.baeldung.com/cs/backtracking-vs-dfs"
          }
        ],
        "tips": [
          "Always consider the base case that defines when a solution is valid.",
          "Use pruning techniques to reduce the search space (e.g., skip duplicates or invalid states early).",
          "Think recursively — build your solution one step at a time and back out if it fails."
        ],
        "common_mistakes": [
          "Not restoring the state after recursion (e.g., not popping from the path or resetting visited flags).",
          "Missing the base case or having it too early.",
          "Not handling duplicates in permutations or combinations."
        ],
        "extra_examples": [
          {
            "title": "N-Queens solver (basic structure)",
            "language": "Python",
            "code": "def solveNQueens(n):\n    res = []\n    board = [\".\" * n for _ in range(n)]\n    def backtrack(r):\n        if r == n:\n            res.append(board[:])\n            return\n        for c in range(n):\n            if is_valid(r, c):\n                board[r] = board[r][:c] + 'Q' + board[r][c+1:]\n                backtrack(r + 1)\n                board[r] = board[r][:c] + '.' + board[r][c+1:]\n    def is_valid(r, c):\n        for i in range(r):\n            if board[i][c] == 'Q': return False\n            if c - (r - i) >= 0 and board[i][c - (r - i)] == 'Q': return False\n            if c + (r - i) < n and board[i][c + (r - i)] == 'Q': return False\n        return True\n    backtrack(0)\n    return res"
          },
          {
            "title": "Subset generator",
            "language": "Python",
            "code": "def subsets(nums):\n    res = []\n    def backtrack(start, path):\n        res.append(path[:])\n        for i in range(start, len(nums)):\n            path.append(nums[i])\n            backtrack(i + 1, path)\n            path.pop()\n    backtrack(0, [])\n    return res"
          }
        ],
        "next_topic_suggestion": "graphs"
      },
      {
        "id": "graphs",
        "title": "Graphs",
        "description": "A graph is a collection of nodes (vertices) connected by edges. Graphs are used to represent networks, relationships, and paths in a wide variety of problems.",
        "explanation": {
          "what_is_it": "A graph consists of vertices (nodes) and edges that connect pairs of vertices. It can be directed or undirected, weighted or unweighted.",
          "why_is_it_important": "Graphs are the foundation for solving routing, connectivity, dependency, and cycle problems. They're used in social networks, maps, scheduling, and more.",
          "real_world_analogy": "Think of a city map — intersections are nodes and roads are edges. You use graph traversal to find the fastest path from one point to another."
        },
        "implementations": [
          {
            "language": "Python",
            "snippet": "# Graph using adjacency list\nfrom collections import defaultdict\n\ngraph = defaultdict(list)\ngraph[0].append(1)\ngraph[1].append(2)\ngraph[2].append(0)"
          },
          {
            "language": "C++",
            "snippet": "#include <vector>\nusing namespace std;\n\nvector<vector<int>> graph(3);\ngraph[0].push_back(1);\ngraph[1].push_back(2);\ngraph[2].push_back(0);"
          }
        ],
        "leetcode_problems": [
          {
            "title": "Course Schedule",
            "difficulty": "Medium",
            "url": "https://leetcode.com/problems/course-schedule/"
          },
          {
            "title": "Number of Connected Components in an Undirected Graph",
            "difficulty": "Medium",
            "url": "https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/"
          },
          {
            "title": "Clone Graph",
            "difficulty": "Medium",
            "url": "https://leetcode.com/problems/clone-graph/"
          },
          {
            "title": "Pacific Atlantic Water Flow",
            "difficulty": "Medium",
            "url": "https://leetcode.com/problems/pacific-atlantic-water-flow/"
          },
          {
            "title": "Reconstruct Itinerary",
            "difficulty": "Hard",
            "url": "https://leetcode.com/problems/reconstruct-itinerary/"
          }
        ],
        "videos": [
          {
            "title": "Graph Theory Crash Course - NeetCode",
            "url": "https://www.youtube.com/watch?v=tWVWeAqZ0WU"
          },
          {
            "title": "Graph Basics and Traversals - WilliamFiset",
            "url": "https://www.youtube.com/watch?v=09_LlHjoEiY"
          }
        ],
        "resources": [
          {
            "title": "GeeksForGeeks: Graph Data Structure",
            "url": "https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/"
          },
          {
            "title": "Graph Visualizer Tool",
            "url": "https://visualgo.net/en/dfsbfs"
          },
          {
            "title": "Intro to Graphs - TopCoder",
            "url": "https://www.topcoder.com/thrive/articles/introduction-to-graphs"
          }
        ],
        "tips": [
          "Use adjacency lists for sparse graphs, adjacency matrices for dense ones.",
          "Learn both BFS and DFS — BFS is good for shortest paths, DFS for components and cycles.",
          "Track visited nodes to prevent infinite loops in cyclic graphs."
        ],
        "common_mistakes": [
          "Not marking nodes as visited before recursive calls in DFS.",
          "Using DFS instead of BFS for shortest path in unweighted graphs.",
          "Misinterpreting directed vs. undirected edges."
        ],
        "extra_examples": [
          {
            "title": "DFS traversal (recursive)",
            "language": "Python",
            "code": "def dfs(node, graph, visited):\n    if node in visited:\n        return\n    visited.add(node)\n    for neighbor in graph[node]:\n        dfs(neighbor, graph, visited)"
          },
          {
            "title": "BFS traversal",
            "language": "Python",
            "code": "from collections import deque\n\ndef bfs(start, graph):\n    visited = set()\n    queue = deque([start])\n    while queue:\n        node = queue.popleft()\n        if node in visited:\n            continue\n        visited.add(node)\n        for neighbor in graph[node]:\n            queue.append(neighbor)"
          }
        ],
        "next_topic_suggestion": "advancedGraphs"
      },
      {
        "id": "advancedGraphs",
        "title": "Advanced Graphs",
        "description": "Advanced graph algorithms extend beyond basic traversal to solve problems involving shortest paths, cycles, spanning trees, connectivity, and more.",
        "explanation": {
          "what_is_it": "Advanced graph topics include algorithms like Dijkstra’s, Bellman-Ford, Floyd-Warshall for shortest paths; Union-Find for disjoint sets; and algorithms for detecting cycles, topological sorting, and minimum spanning trees.",
          "why_is_it_important": "These algorithms solve real-world problems such as network routing, job scheduling, dependency resolution, and cluster detection. They're fundamental in computer science and competitive programming.",
          "real_world_analogy": "Think of Google Maps finding the shortest route (Dijkstra), planning build order for a skyscraper (topological sort), or organizing communities in a social network (Union-Find)."
        },
        "implementations": [
          {
            "language": "Python",
            "snippet": "# Dijkstra's algorithm using a min-heap\nimport heapq\n\ndef dijkstra(graph, start):\n    dist = {node: float('inf') for node in graph}\n    dist[start] = 0\n    heap = [(0, start)]\n    while heap:\n        d, node = heapq.heappop(heap)\n        if d > dist[node]: continue\n        for nei, weight in graph[node]:\n            if d + weight < dist[nei]:\n                dist[nei] = d + weight\n                heapq.heappush(heap, (dist[nei], nei))\n    return dist"
          },
          {
            "language": "C++",
            "snippet": "// Union-Find with path compression\nvector<int> parent(n);\n\nint find(int x) {\n    if (x != parent[x]) parent[x] = find(parent[x]);\n    return parent[x];\n}\n\nvoid unite(int x, int y) {\n    parent[find(x)] = find(y);\n}"
          }
        ],
        "leetcode_problems": [
          {
            "title": "Network Delay Time",
            "difficulty": "Medium",
            "url": "https://leetcode.com/problems/network-delay-time/"
          },
          {
            "title": "Redundant Connection",
            "difficulty": "Medium",
            "url": "https://leetcode.com/problems/redundant-connection/"
          },
          {
            "title": "Minimum Spanning Tree - Prim’s/Kruskal",
            "difficulty": "Hard",
            "url": "https://leetcode.com/problems/connecting-cities-with-minimum-cost/"
          },
          {
            "title": "Course Schedule II",
            "difficulty": "Medium",
            "url": "https://leetcode.com/problems/course-schedule-ii/"
          },
          {
            "title": "Find Eventual Safe States",
            "difficulty": "Medium",
            "url": "https://leetcode.com/problems/find-eventual-safe-states/"
          }
        ],
        "videos": [
          {
            "title": "Dijkstra’s Algorithm - NeetCode",
            "url": "https://www.youtube.com/watch?v=GazC3A4OQTE"
          },
          {
            "title": "Union Find Explained - HackerRank",
            "url": "https://www.youtube.com/watch?v=ayW5B2W9hfo"
          },
          {
            "title": "Topological Sort - WilliamFiset",
            "url": "https://www.youtube.com/watch?v=ddTC4Zovtbc"
          }
        ],
        "resources": [
          {
            "title": "GeeksForGeeks: Advanced Graph Algorithms",
            "url": "https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/"
          },
          {
            "title": "Kruskal vs Prim - MST Algorithms",
            "url": "https://www.geeksforgeeks.org/greedy-algorithms-set-5-prims-minimum-spanning-tree-mst-2/"
          },
          {
            "title": "Tarjan’s Algorithm for SCCs",
            "url": "https://www.geeksforgeeks.org/tarjan-algorithm-find-strongly-connected-components/"
          }
        ],
        "tips": [
          "Use Dijkstra for shortest paths with non-negative weights; Bellman-Ford handles negative weights.",
          "Topological sort only works on Directed Acyclic Graphs (DAGs).",
          "Union-Find is excellent for detecting cycles and grouping connected components."
        ],
        "common_mistakes": [
          "Using Dijkstra on graphs with negative weights — use Bellman-Ford instead.",
          "Forgetting to initialize parent pointers in Union-Find.",
          "Not checking for DAG property before applying topological sort."
        ],
        "extra_examples": [
          {
            "title": "Topological Sort (DFS)",
            "language": "Python",
            "code": "def topo_sort(graph):\n    visited, result = set(), []\n    def dfs(node):\n        if node in visited:\n            return\n        visited.add(node)\n        for neighbor in graph[node]:\n            dfs(neighbor)\n        result.append(node)\n    for node in graph:\n        dfs(node)\n    return result[::-1]"
          },
          {
            "title": "Bellman-Ford shortest path",
            "language": "Python",
            "code": "def bellman_ford(edges, V, source):\n    dist = [float('inf')] * V\n    dist[source] = 0\n    for _ in range(V - 1):\n        for u, v, w in edges:\n            if dist[u] + w < dist[v]:\n                dist[v] = dist[u] + w\n    return dist"
          }
        ],
        "next_topic_suggestion": "dp1d"
      },
      {
        "id": "dp1d",
        "title": "1-D Dynamic Programming",
        "description": "1-D Dynamic Programming involves solving problems by breaking them into overlapping subproblems and storing intermediate results in a one-dimensional array to avoid recomputation.",
        "explanation": {
          "what_is_it": "1-D DP uses a single array (or list) to store results of subproblems. It’s useful when the current state depends only on previous one or two states.",
          "why_is_it_important": "Many classic problems such as Fibonacci, climbing stairs, and robbing houses can be solved using 1-D DP, leading to massive improvements in performance over naive recursion.",
          "real_world_analogy": "Think of climbing stairs: the number of ways to reach step `n` depends on the number of ways to reach step `n-1` and `n-2`. You can reuse the results of previous steps instead of recomputing."
        },
        "implementations": [
          {
            "language": "Python",
            "snippet": "# Fibonacci with 1-D DP\ndef fib(n):\n    if n <= 1: return n\n    dp = [0] * (n + 1)\n    dp[1] = 1\n    for i in range(2, n + 1):\n        dp[i] = dp[i - 1] + dp[i - 2]\n    return dp[n]"
          },
          {
            "language": "C++",
            "snippet": "int fib(int n) {\n    if (n <= 1) return n;\n    vector<int> dp(n + 1);\n    dp[0] = 0, dp[1] = 1;\n    for (int i = 2; i <= n; ++i)\n        dp[i] = dp[i - 1] + dp[i - 2];\n    return dp[n];\n}"
          }
        ],
        "leetcode_problems": [
          {
            "title": "Climbing Stairs",
            "difficulty": "Easy",
            "url": "https://leetcode.com/problems/climbing-stairs/"
          },
          {
            "title": "House Robber",
            "difficulty": "Medium",
            "url": "https://leetcode.com/problems/house-robber/"
          },
          {
            "title": "Maximum Subarray",
            "difficulty": "Medium",
            "url": "https://leetcode.com/problems/maximum-subarray/"
          },
          {
            "title": "Nth Tribonacci Number",
            "difficulty": "Easy",
            "url": "https://leetcode.com/problems/n-th-tribonacci-number/"
          },
          {
            "title": "Minimum Cost Climbing Stairs",
            "difficulty": "Easy",
            "url": "https://leetcode.com/problems/min-cost-climbing-stairs/"
          }
        ],
        "videos": [
          {
            "title": "1D DP Introduction - NeetCode",
            "url": "https://www.youtube.com/watch?v=Y0lT9Fck7qI"
          },
          {
            "title": "Climbing Stairs - Tech With Tim",
            "url": "https://www.youtube.com/watch?v=Y0lT9Fck7qI"
          }
        ],
        "resources": [
          {
            "title": "GeeksForGeeks: Dynamic Programming",
            "url": "https://www.geeksforgeeks.org/dynamic-programming/"
          },
          {
            "title": "Leetcode Pattern: 1D DP",
            "url": "https://seanprashad.com/leetcode-patterns/#dynamic-programming"
          }
        ],
        "tips": [
          "Always start by writing a brute-force recursive solution, then add memoization or tabulation.",
          "Try space optimization: you may not need the full array if only the last one or two values are needed.",
          "Focus on defining the correct state and recurrence relation."
        ],
        "common_mistakes": [
          "Not initializing the base cases properly.",
          "Using recursion without memoization — leads to exponential time.",
          "Mixing up the state transition logic (e.g., wrong indices)."
        ],
        "extra_examples": [
          {
            "title": "House Robber - avoid adjacent houses",
            "language": "Python",
            "code": "def rob(nums):\n    if not nums: return 0\n    if len(nums) <= 2: return max(nums)\n    dp = [0] * len(nums)\n    dp[0], dp[1] = nums[0], max(nums[0], nums[1])\n    for i in range(2, len(nums)):\n        dp[i] = max(dp[i - 1], dp[i - 2] + nums[i])\n    return dp[-1]"
          },
          {
            "title": "Max Subarray Sum (Kadane’s)",
            "language": "Python",
            "code": "def maxSubArray(nums):\n    max_current = max_global = nums[0]\n    for i in range(1, len(nums)):\n        max_current = max(nums[i], max_current + nums[i])\n        max_global = max(max_global, max_current)\n    return max_global"
          }
        ],
        "next_topic_suggestion": "dp2d"
      },
      {
        "id": "dp2d",
        "title": "2-D Dynamic Programming",
        "description": "2-D Dynamic Programming uses a matrix (2D array) to store solutions to subproblems, often involving combinations of multiple variables like index pairs, dimensions, or substrings.",
        "explanation": {
          "what_is_it": "2D DP is a technique where the current state depends on two dimensions — for example, i and j in a grid or in a substring. The DP table stores values computed from overlapping subproblems in these dimensions.",
          "why_is_it_important": "Many real-world problems, like pathfinding in grids, string similarity, edit distance, and optimal game strategies require 2D DP. It transforms exponential brute-force solutions into polynomial-time solutions.",
          "real_world_analogy": "Imagine filling out a spreadsheet where each cell depends on values from cells above, to the left, or diagonally — that's exactly how 2D DP works."
        },
        "implementations": [
          {
            "language": "Python",
            "snippet": "# Edit distance between two strings\ndef minDistance(word1, word2):\n    m, n = len(word1), len(word2)\n    dp = [[0]*(n+1) for _ in range(m+1)]\n    for i in range(m+1):\n        for j in range(n+1):\n            if i == 0: dp[i][j] = j\n            elif j == 0: dp[i][j] = i\n            elif word1[i-1] == word2[j-1]:\n                dp[i][j] = dp[i-1][j-1]\n            else:\n                dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])\n    return dp[m][n]"
          },
          {
            "language": "C++",
            "snippet": "int uniquePaths(int m, int n) {\n    vector<vector<int>> dp(m, vector<int>(n, 1));\n    for (int i = 1; i < m; ++i)\n        for (int j = 1; j < n; ++j)\n            dp[i][j] = dp[i-1][j] + dp[i][j-1];\n    return dp[m-1][n-1];\n}"
          }
        ],
        "leetcode_problems": [
          {
            "title": "Unique Paths",
            "difficulty": "Medium",
            "url": "https://leetcode.com/problems/unique-paths/"
          },
          {
            "title": "Edit Distance",
            "difficulty": "Hard",
            "url": "https://leetcode.com/problems/edit-distance/"
          },
          {
            "title": "Longest Common Subsequence",
            "difficulty": "Medium",
            "url": "https://leetcode.com/problems/longest-common-subsequence/"
          },
          {
            "title": "0/1 Knapsack",
            "difficulty": "Medium",
            "url": "https://leetcode.com/problems/ones-and-zeroes/"
          },
          {
            "title": "Longest Palindromic Subsequence",
            "difficulty": "Medium",
            "url": "https://leetcode.com/problems/longest-palindromic-subsequence/"
          }
        ],
        "videos": [
          {
            "title": "2D DP Explained - NeetCode",
            "url": "https://www.youtube.com/watch?v=Ub6USi0GLNc"
          },
          {
            "title": "Edit Distance DP - Tushar Roy",
            "url": "https://www.youtube.com/watch?v=We3YDTzNXEk"
          }
        ],
        "resources": [
          {
            "title": "GeeksForGeeks: 2D DP Problems",
            "url": "https://www.geeksforgeeks.org/dynamic-programming/"
          },
          {
            "title": "2D DP Patterns - LeetCode",
            "url": "https://leetcode.com/discuss/general-discussion/475924/my-experience-on-dynamic-programming"
          }
        ],
        "tips": [
          "Clearly define your state: dp[i][j] usually represents a result based on prefix or position pairs.",
          "Decide if iteration should go row-wise or column-wise depending on dependencies.",
          "Consider space optimization — sometimes only the current and previous row are needed."
        ],
        "common_mistakes": [
          "Forgetting to initialize the first row/column correctly.",
          "Incorrectly setting up recurrence relations or boundaries.",
          "Not optimizing space when the state only depends on i-1 or j-1."
        ],
        "extra_examples": [
          {
            "title": "Longest Common Subsequence",
            "language": "Python",
            "code": "def lcs(text1, text2):\n    m, n = len(text1), len(text2)\n    dp = [[0]*(n+1) for _ in range(m+1)]\n    for i in range(1, m+1):\n        for j in range(1, n+1):\n            if text1[i-1] == text2[j-1]:\n                dp[i][j] = dp[i-1][j-1] + 1\n            else:\n                dp[i][j] = max(dp[i-1][j], dp[i][j-1])\n    return dp[m][n]"
          },
          {
            "title": "Unique Paths in Grid with Obstacles",
            "language": "Python",
            "code": "def uniquePathsWithObstacles(grid):\n    m, n = len(grid), len(grid[0])\n    dp = [[0]*n for _ in range(m)]\n    dp[0][0] = 1 if grid[0][0] == 0 else 0\n    for i in range(m):\n        for j in range(n):\n            if grid[i][j] == 1 or (i == 0 and j == 0): continue\n            if i > 0: dp[i][j] += dp[i-1][j]\n            if j > 0: dp[i][j] += dp[i][j-1]\n    return dp[-1][-1]"
          }
        ],
        "next_topic_suggestion": "bitManip"
      },
      {
        "id": "bitManip",
        "title": "Bit Manipulation",
        "description": "Bit manipulation is the act of algorithmically handling individual bits using operations like AND, OR, XOR, shifts, and complements. It enables fast and memory-efficient computation.",
        "explanation": {
          "what_is_it": "Bit manipulation uses binary operators to change, query, or interpret values at the bit level. Common operations include bitwise AND (&), OR (|), XOR (^), NOT (~), and shifts (<<, >>).",
          "why_is_it_important": "Bit manipulation leads to extremely fast solutions with low memory usage. It’s especially useful in competitive programming, systems design, and problems involving subsets, parity, and state compression.",
          "real_world_analogy": "Think of a row of switches (bits). You can flip them, check if a light is on or off, or combine settings — all with quick and efficient flicks (bit operations)."
        },
        "implementations": [
          {
            "language": "Python",
            "snippet": "# Count number of 1s in binary (Hamming weight)\ndef hammingWeight(n):\n    count = 0\n    while n:\n        n &= n - 1  # drops the lowest set bit\n        count += 1\n    return count"
          },
          {
            "language": "C++",
            "snippet": "int hammingWeight(uint32_t n) {\n    int count = 0;\n    while (n) {\n        n &= (n - 1);\n        count++;\n    }\n    return count;\n}"
          }
        ],
        "leetcode_problems": [
          {
            "title": "Single Number",
            "difficulty": "Easy",
            "url": "https://leetcode.com/problems/single-number/"
          },
          {
            "title": "Number of 1 Bits",
            "difficulty": "Easy",
            "url": "https://leetcode.com/problems/number-of-1-bits/"
          },
          {
            "title": "Sum of Two Integers",
            "difficulty": "Medium",
            "url": "https://leetcode.com/problems/sum-of-two-integers/"
          },
          {
            "title": "Counting Bits",
            "difficulty": "Easy",
            "url": "https://leetcode.com/problems/counting-bits/"
          },
          {
            "title": "Maximum XOR of Two Numbers in an Array",
            "difficulty": "Hard",
            "url": "https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/"
          }
        ],
        "videos": [
          {
            "title": "Bit Manipulation Tutorial - NeetCode",
            "url": "https://www.youtube.com/watch?v=7h1s2SojIRw"
          },
          {
            "title": "Bits & Binary Tricks - WilliamFiset",
            "url": "https://www.youtube.com/watch?v=ZusiKXcz_ac"
          }
        ],
        "resources": [
          {
            "title": "GeeksForGeeks: Bit Manipulation",
            "url": "https://www.geeksforgeeks.org/bitwise-operators-in-c-cpp/"
          },
          {
            "title": "Bit Manipulation Cheat Sheet",
            "url": "https://graphics.stanford.edu/~seander/bithacks.html"
          },
          {
            "title": "Python Bitwise Operators Explained",
            "url": "https://realpython.com/python-bitwise-operators/"
          }
        ],
        "tips": [
          "Use `x & (x - 1)` to remove the lowest set bit.",
          "Use `x & -x` to isolate the lowest set bit.",
          "Use XOR to find non-repeating elements — it cancels out duplicates."
        ],
        "common_mistakes": [
          "Forgetting that negative numbers in binary are stored in two’s complement.",
          "Not masking values correctly when working with 32-bit or unsigned integers.",
          "Confusing bitwise AND/OR with logical AND/OR (`&` vs `and`, `|` vs `or`)."
        ],
        "extra_examples": [
          {
            "title": "Find the only non-repeating number (all others appear twice)",
            "language": "Python",
            "code": "def singleNumber(nums):\n    result = 0\n    for num in nums:\n        result ^= num\n    return result"
          },
          {
            "title": "Check if a number is a power of two",
            "language": "Python",
            "code": "def isPowerOfTwo(n):\n    return n > 0 and (n & (n - 1)) == 0"
          }
        ],
        "next_topic_suggestion": "math"
      },
      {
        "id": "math",
        "title": "Math & Geometry",
        "description": "Math and geometry problems involve numerical logic, arithmetic, combinatorics, number theory, and spatial calculations. They form the foundation of algorithm design and optimization.",
        "explanation": {
          "what_is_it": "This topic covers arithmetic operations, modulo math, GCD/LCM, prime factorization, combinatorics (nCr, permutations), geometry (area, distance), and coordinate algorithms.",
          "why_is_it_important": "Understanding mathematical principles enables you to optimize solutions, avoid overflows, and solve problems efficiently using number patterns, modular arithmetic, and geometric relationships.",
          "real_world_analogy": "Think of map apps calculating distances, engineers modeling curves, or password systems using prime number-based cryptography — all rely on math and geometry."
        },
        "implementations": [
          {
            "language": "Python",
            "snippet": "# Greatest Common Divisor (Euclidean Algorithm)\ndef gcd(a, b):\n    while b:\n        a, b = b, a % b\n    return a\n\n# Sieve of Eratosthenes\ndef sieve(n):\n    is_prime = [True] * (n + 1)\n    is_prime[0] = is_prime[1] = False\n    for i in range(2, int(n**0.5) + 1):\n        if is_prime[i]:\n            for j in range(i*i, n + 1, i):\n                is_prime[j] = False\n    return is_prime"
          },
          {
            "language": "C++",
            "snippet": "// Euclidean GCD\nint gcd(int a, int b) {\n    while (b) {\n        int temp = b;\n        b = a % b;\n        a = temp;\n    }\n    return a;\n}"
          }
        ],
        "leetcode_problems": [
          {
            "title": "Greatest Common Divisor of Strings",
            "difficulty": "Easy",
            "url": "https://leetcode.com/problems/greatest-common-divisor-of-strings/"
          },
          {
            "title": "Count Primes",
            "difficulty": "Medium",
            "url": "https://leetcode.com/problems/count-primes/"
          },
          {
            "title": "Happy Number",
            "difficulty": "Easy",
            "url": "https://leetcode.com/problems/happy-number/"
          },
          {
            "title": "Basic Calculator II",
            "difficulty": "Medium",
            "url": "https://leetcode.com/problems/basic-calculator-ii/"
          },
          {
            "title": "Rectangle Overlap",
            "difficulty": "Easy",
            "url": "https://leetcode.com/problems/rectangle-overlap/"
          }
        ],
        "videos": [
          {
            "title": "GCD, LCM and Number Theory - NeetCode",
            "url": "https://www.youtube.com/watch?v=0M_kIqhwbFo"
          },
          {
            "title": "Sieve of Eratosthenes & Prime Tricks - WilliamFiset",
            "url": "https://www.youtube.com/watch?v=EJWwzP9B93Y"
          },
          {
            "title": "Geometry Algorithms for Coding Interviews",
            "url": "https://www.youtube.com/watch?v=5cnIQ2Hgdtg"
          }
        ],
        "resources": [
          {
            "title": "GeeksForGeeks: Number Theory",
            "url": "https://www.geeksforgeeks.org/number-theory-competitive-programming/"
          },
          {
            "title": "GeeksForGeeks: Computational Geometry",
            "url": "https://www.geeksforgeeks.org/computational-geometry/"
          },
          {
            "title": "CP Algorithms - Math",
            "url": "https://cp-algorithms.com/math/"
          }
        ],
        "tips": [
          "Use fast exponentiation (`pow(a, b, mod)`) to avoid overflow in modulo operations.",
          "Use `gcd(a, b)` to simplify fractions and to check co-primality.",
          "For geometry, remember distance formula, midpoint, and area of triangle formulas."
        ],
        "common_mistakes": [
          "Off-by-one errors when applying modulo or division.",
          "Forgetting to check for division by zero.",
          "Incorrect application of geometry formulas — especially signs and order of coordinates."
        ],
        "extra_examples": [
          {
            "title": "Check if a number is prime",
            "language": "Python",
            "code": "def is_prime(n):\n    if n < 2:\n        return False\n    for i in range(2, int(n ** 0.5) + 1):\n        if n % i == 0:\n            return False\n    return True"
          },
          {
            "title": "Compute the area of a triangle given 3 points",
            "language": "Python",
            "code": "def triangle_area(x1, y1, x2, y2, x3, y3):\n    return abs((x1*(y2 - y3) + x2*(y3 - y1) + x3*(y1 - y2)) / 2)"
          }
        ],
        "next_topic_suggestion": null
      }     
  ]