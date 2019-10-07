Collect Import
===============

The **Collect Import** (named temporarily) extension collects all the imported modules in the notebook into a single cell on the top. This is valid only for python.


The lines in a cell
```python
import os, sys,time
from itertools import groupby
import sys
import numpy as np
```
is put as
```python
import os
import sys
import time
import numpy as np
from itertools import groupby
```
on the top.

