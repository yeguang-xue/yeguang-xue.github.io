---
layout: post
title: Notes on The Data Scientist’s Toolbox
location: Evanston
tags:
  - Notes
comments: True
---

### Getting and Cleaning Data Content

* Raw vs. tidy data
* Downloading files
* Reading data
* Excel, XML, JSON, MySQL, HDF5, Web, ...
* Merging data
* Reshaping data
* Summarizing data
* Finding and replacing
* Data resources

{% highlight R linenos %}
mergedData2 <- merge(reviews, solutions,
  by.x = "solution_id", by.y = "id", all = TRUE)
head(mergedData2[, 1:6], 3)
reviews[1, 1:6]
{% endhighlight %}

Exploratory Analysis Content

* Principles of Analytic Graphics
* Exploratory graphs
* Plotting Systems in R
  - base
  - lattice
  - ggplot2
* Hierarchical clustering
* K-Means clustering
* Dimension reduction

Principles of Analytic Graphics

* Principle 1: Show comparisons
* Principle 2: Show causality, mechanism, explanation
* Principle 3: Show multivariate data
* Principle 4: Integrate multiple modes of evidence
* Principle 5: Describe and document the evidence
* Principle 6: Content is king


Reproducible Research Content
Structure of a Data Analysis
Organizing a Data Analysis
Markdown
LaTeX
R Markdown
Evidence-based data analysis
RPubs


Steps in a data analysis
Define the question
Define the ideal data set
Determine what data you can access
Obtain the data
Clean the data
Exploratory data analysis
Statistical prediction/modeling
Interpret results
Challenge results
Synthesize/write up results
Create reproducible code


Data analysis files
Data
Raw data
Processed data
Figures
Exploratory figures
Final figures
R code
Raw scripts
Final scripts
R Markdown files (optional)
Text
Readme files
Text of analysis



* R packages provide a powerful mechanism for extending the functionality of R
* R packages can be obtained from CRAN or other repositories
{% highlight R linenos %}
install.packages("slidify")
install.packages(c("slidify", "ggplot2", "devtools")) 
{% endhighlight %}
*
The install.packages() can be used to install packages at the R console

The library() function loads packages that have been installed so that you may access the functionality in the package
