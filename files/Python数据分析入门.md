# Python 数据分析入门

Python是数据科学领域的首选语言，本文将介绍使用Python进行数据分析的基础知识。

## 所需库

```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
```

## 数据加载

```python
# 从CSV文件加载数据
df = pd.read_csv('data.csv')

# 查看数据前5行
print(df.head())

# 数据基本信息
print(df.info())
print(df.describe())
```

## 数据清洗

### 处理缺失值
```python
# 检查缺失值
print(df.isnull().sum())

# 填充缺失值
df['age'].fillna(df['age'].mean(), inplace=True)

# 删除包含缺失值的行
df.dropna(inplace=True)
```

### 处理重复值
```python
# 检查重复值
print(df.duplicated().sum())

# 删除重复值
df.drop_duplicates(inplace=True)
```

## 数据转换

```python
# 数据类型转换
df['date'] = pd.to_datetime(df['date'])

# 创建新列
df['age_group'] = pd.cut(df['age'], 
                         bins=[0, 18, 35, 60, 100],
                         labels=['少年', '青年', '中年', '老年'])

# 独热编码
df_encoded = pd.get_dummies(df, columns=['category'])
```

## 数据分析

### 描述性统计
```python
# 数值列统计
numeric_stats = df.describe()

# 分类列统计
categorical_stats = df['category'].value_counts()

# 相关性分析
correlation_matrix = df.corr()
```

### 分组聚合
```python
# 按类别分组统计
grouped = df.groupby('category').agg({
    'sales': ['mean', 'sum', 'count'],
    'profit': 'mean'
})

# 多级分组
multi_grouped = df.groupby(['year', 'category']).agg({
    'revenue': 'sum'
})
```

## 数据可视化

### 折线图
```python
plt.figure(figsize=(10, 6))
plt.plot(df['date'], df['sales'])
plt.title('销售额趋势')
plt.xlabel('日期')
plt.ylabel('销售额')
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()
```

### 柱状图
```python
plt.figure(figsize=(10, 6))
df['category'].value_counts().plot(kind='bar')
plt.title('类别分布')
plt.xlabel('类别')
plt.ylabel('数量')
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()
```

### 散点图
```python
plt.figure(figsize=(10, 6))
plt.scatter(df['age'], df['income'])
plt.title('年龄与收入关系')
plt.xlabel('年龄')
plt.ylabel('收入')
plt.tight_layout()
plt.show()
```

### 热力图
```python
plt.figure(figsize=(12, 8))
sns.heatmap(correlation_matrix, 
            annot=True, 
            cmap='coolwarm',
            center=0)
plt.title('相关性热力图')
plt.tight_layout()
plt.show()
```

## 高级分析技巧

### 时间序列分析
```python
# 设置日期索引
df_time = df.set_index('date')

# 重采样
monthly_sales = df_time['sales'].resample('M').sum()

# 移动平均
rolling_avg = df_time['sales'].rolling(window=7).mean()
```

### 机器学习集成
```python
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error

# 准备特征和目标变量
X = df[['feature1', 'feature2', 'feature3']]
y = df['target']

# 划分训练测试集
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# 训练模型
model = LinearRegression()
model.fit(X_train, y_train)

# 预测和评估
predictions = model.predict(X_test)
mse = mean_squared_error(y_test, predictions)
print(f'均方误差: {mse:.2f}')
```

## 最佳实践

1. **数据备份**: 始终保留原始数据的副本
2. **版本控制**: 使用Git管理代码和数据分析流程
3. **文档化**: 为每个分析步骤添加注释
4. **可视化优先**: 先可视化数据，再进行分析
5. **结果验证**: 使用多种方法验证分析结果

---

通过掌握这些基础技能，你将能够使用Python进行有效的数据分析！