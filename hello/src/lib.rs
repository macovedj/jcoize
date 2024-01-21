cargo_component_bindings::generate!();

use std::fs;

use bindings::Guest;
// use cargo_component_bindings::rt::r

struct Component;

impl Guest for Component {
    /// Say hello!
    fn hello_world() -> String {
        let foo = fs::read("./foo").unwrap();
        String::from_utf8(foo).unwrap()
    }
}
