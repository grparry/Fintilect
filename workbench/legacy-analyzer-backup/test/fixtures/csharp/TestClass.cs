using System;
using System.Collections.Generic;

namespace TestNamespace
{
    public class TestClass
    {
        public List<string> Items { get; set; }
        public List<int> Numbers { get; set; }
        public List<TestClass> Children { get; set; }
    }
}
